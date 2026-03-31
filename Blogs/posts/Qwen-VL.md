# Qwen系列之——Qwen-VL

技术报告：https://arxiv.org/pdf/2308.12966v2

# 0. 阅读收获
> 读完本文，你将了解到：
> - Qwen-VL 的模型架构
> - Qwen-VL 的训练流程

---
Qwen系列的多模态大模型为我们理解多模态大模型提供了很好的insights。截止到目前为止，Qwen系列多模态模型已经更新到了Qwen3.5-Omni了，这是一个**全模态**模型，支持文本、图像、视频和音频...已经是一个非常全面的模型了。为了更好地了解Qwen系列的多模态大模型，我决定从Qwen-VL，他的第一代讲起，来了解他的全面更新发展过程。

多模态大模型主要围绕着一个问题进行展开：怎样对齐和融合视觉和语义特征。他要做的就是为视觉和文字的表征鸿沟搭建一座桥梁。比如，之前讲的[CLIP](https://cheny1ming.github.io/Blogs/post.html?id=clip)，用对比学习拉近文字和图像之间的距离，在一个空间中对齐，结果CLIP不仅仅可以分类训练集中的图像，甚至还能预测某些训练集中没有的类别，具有很好的外推性。让模型同时具备理解语言和视觉信息的能力，这就是多模态大模型的意义。

---
## 1. 模型架构

Qwen-VL使用了一个非常经典的多模态大模型架构。

![model](assets/images/Qwen-VL/model.png)

如图所示，模型架构非常简单，主要由三个部分构成：

### 1.1 视觉编码器（Visual Encoder）

Qwen-VL 的视觉编码器采用了 ViT 架构，其初始权重来自 Openclip 的 ViT-bigG的预训练权重。在训练和推理过程中，输入图像都会被调整到特定的分辨率。视觉编码器通过将图像分割成步长为 14 的补丁来处理图像，从而生成一组图像特征。

### 1.2 位置感知视觉 - 语言适配器（Position-aware Vision-Language Adapter）

视觉 - 语言适配器是用来对齐语言和图像特征的。该适配器包含一个随机初始化的单层交叉注意力模块。该模块使用一组可训练向量作为查询向量（query），并使用来自视觉编码器的图像特征作为交叉注意力操作的keys和values。固定 256 个的可训练 Query（查询向量），核心作用就是：让模型主动、精准地从一整张图片里，提取出最关键的 256 份视觉信息，替代整张图片的原始特征，送给语言模型理解。这个机制将视觉特征序列压缩到固定长度 256。计算流程是这样的：

```python
# 1. 初始化 256 个可学习查询向量
query = nn.Parameter(torch.randn(1, 256, embed_dim))
# 2. 视觉编码器输出图像特征 (B, N, D)，N≈1024
img_feat = visual_encoder(image)
# 3. 单层交叉注意力：用 256 个 query 去"聚合"N 个 img_feat
compressed_feat = cross_attention(query=query, key=img_feat, value=img_feat)
# 4. 输出 shape: (B, 256, D) → 送入语言模型
```

此外，考虑到位置信息对细粒度图像理解的重要性，2D 绝对位置编码被融入交叉注意力机制的查询 - 键对中，以减轻压缩过程中可能出现的位置细节丢失问题。长度为 256 的压缩图像特征序列随后被输入到大型语言模型中。

### 1.3 大语言模型（LLM）
Qwen-VL 直接使用 Qwen-7B 的预训练权重进行初始化。上面处理好的256个视觉特征和文本（prompt）一起被输入进大语言模型中进行处理。

Qwen原始的LLM模型如下图所示（引用自知乎），Qwen-VL只不过在文本Embedding时，同时也将vision embedding信息也拼接在一起了。

<img src="assets/images/Qwen-VL/LLM.png" alt="LLM" height="70%" width="70%">

3个组件的参数量如下：

![parameter](assets/images/Qwen-VL/parameter.png)

---
## 2. 训练
![train](assets/images/Qwen-VL/train.png)

蓝色（冻结）表示不参与参数更新，红色（燃烧）则参与参数更新。

训练包含了三个阶段：

### 2.1 Stage 1 （Pre-training）
预训练，目标是使用大量的图文Pair对数据对齐视觉模块和LLM的特征，这个阶段冻结LLM模块的参数，仅优化vision encoder和VL adapter。输入224x224 image，1.5 billion的image-text samples，500 billione tokens。目标：最小化text-token的交叉熵损失。

### 2.2 Stage 2 （Multi-task Pre-training）
为多任务预训练，使用更高质量的图文多任务数据（主要来源于开源VL任务，部分自建数据集），更高的图片像素输入，全参数训练。high-quality and fine-grained VL annotation data。Vision encoder的输入从224x224变为448x448。

Qwen-VL模型在第二个预训练阶段同时进行了以下七个任务的训练：

- 图像描述（Captioning）
- 视觉问答（VQA）
- 定位任务（Grounding）
- 参考定位和定位描述的双重任务（Ref Grounding 和 Grounded Cap）
- 光学字符识别（OCR）
- 文本生成（Text Generation）

在这个阶段，作者综合利用了不同的数据源和任务，使得模型能够在多方面进行训练，从而提升其对于图像与文本的综合理解能力。

### 2.3 Stage 3 （Supervised Fine-tuning）
通过指令微调的方式，提升模型对话能力。多模态指令微调数据来源于caption数据和LLM产生的对话数据。同时将多模态数据和纯文本对话数据进行混合，确保模型有通用对话能力，训练数据350K。模型训练阶段Freeze vision encoder，仅训练语言模型和adapter。这样做的目的是确保模型可以有效地将这些能力传递到更广泛的语言和问题类型中，从而提升了模型在交互和对话方面的性能。

微调模板：
![sft](assets/images/Qwen-VL/sft.png)

---
## 3. 小结
Qwen-VL其实很简单，它主要利用大语言模型强大的处理信息能力，通过一个视觉适配器将图像处理后和文本一起喂给大语言模型进行处理。通过三个训练阶段让Qwen-VL具备对于不同任务的解决问题能力，为后续的Qwen系列视觉-语言模型的改进奠定了良好的基础。

---
**作者**: 陈羿铭

**发布于**: 2026.3.30