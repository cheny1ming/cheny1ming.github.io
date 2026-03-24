# Kimi 新作 AttnRes：让残差网络学会 "选择性记忆"

论文地址：[Attention Resnet](https://arxiv.org/pdf/2603.15031)

## 0. 阅读收获

> 读完本文，你将了解到：
> - 传统残差网络有哪些缺陷？
> - Attention Resnet核心原理
> - Full Attention 和 Block Attention 分别是什么？
> - Block Attention：用效果换效率
> - 实验结果

---
最近Kimi的这篇作品大火，圈内很多大佬都给予了高度评价。Kimi团队这次从Transformer架构的底层入手，打破了维持了十几年的残差网络范式，是一次非常激进的尝试。当然，这篇文章的解读在网络上也随处可见了，如果你有一定的基础，那我推荐你去阅读一下这篇文章的作者[苏神的创作回忆录](https://kexue.fm/archives/11664)。读大佬的文章是享受的，简短精炼，没有一句废话，让人醍醐灌顶，连公式都是赏心悦目，值得学习。本篇博客呢，旨在从一个简单的角度去解读注意力残差，重点是要简单。让我们开始，走进AttnRes。

---
## 1. 残差网络

注意力残差，顾名思义，就是注意力机制和残差网络的结合。残差注意力大家应该都知道，是大语言模型当之无愧的核心基石，解决了深层网络训练中的梯度消失问题，让模型能够轻松扩展到数百层，它的公式是：

$$
h_{l} = h_{l - 1} + f_{l - 1}(h_{l - 1})
$$

$h_{l}$ 是第 $l$ 层输出的状态，它是由上一层的核心变换 $f_{l - 1}(h_{l - 1})$（比如Transformer中的注意力机制或者MLP），加上上一层原始输入 $h_{l - 1}$ 得来的。也可以表示成：

$$
h_{l} = h_{1} + \sum_{i = 1}^{l - 1} f_{i}(h_{i})
$$

- $h_{1}$ 是第一层的输入
- $f_{i}(h_{i})$ 是第 $i$ 层的变换

想象一下，我们在玩传话游戏。每一个人都要向下一个人传递信息，每一个人都会融合前一个人给的信息加上自己的一点小小加工传给下一个人，最后一个人就会得到所有的信息。

Transformer中有好几个网络层，每一个网络层可能都有不同的侧重点，比如说这一层侧重于语义关联，第二层侧重名词联系等等。那么残差网络这么做的目的，一是希望后续的计算带着点前面计算出来的信息，二是可以防止梯度消失和梯度爆炸。

### 1.1 残差网络的缺陷

上述这种方法解决了信息消失的问题，也解决的梯度消失，但也带来了新的问题：**信息稀释**。我们来仔细分析一下这个公式：$h_{l} = h_{1} + \sum_{i = 1}^{l} f_{i}(h_{i})$，这里的 $h_{1}$ 是最初的输入嵌入（比如文本的词向量），后面的求和项是所有前序层的变换输出。

问题的核心在于：**所有前序层的贡献都被赋予了相同的权重（系数都是 1）**。在我们之前举过的传话例子当中，不管是谁的发言，都被同等对待汇总了最后一个人。随着人数的增多，前面几个人附加的信息可能就被忽略掉了，但这有可能就是对于后续决策非常有用的信息。回到Transformer架构中，随着网络层数增加（比如达到 100 层），每一层的独特贡献都会被这 100 个求和项 "平均稀释"，早期层的关键信息有可能已经被深深掩埋，也有可能已经被变换处理的不成样子。

更严重的是，这种无差别累积会导致隐藏状态的数值随着层数增长而无限放大（学术上称为 O(L) 增长，L 是层数）。为了在这种累积中保持自身影响力，深层网络不得不学习输出更大的数值，这会让训练变得不稳定，甚至出现梯度爆炸。

![AttnRes_overview](assets/images/AttnRes/AttnRes_overview.png)

图(a)就是上面所说的沿用了十几年的ResNet，后面两张图是Kimi团队更新的AttnRes，我们一张一张来看。先来看Full Attention Residuals（图(b)）。

## 2. Full Attention Residuals

既然问题出在 "无差别平均"，那解决方案自然是让网络学会 "选择性关注"，这就是 Full AttnRes 的核心思想。

### 2.1 核心原理

Full AttnRes 的本质的是：**把原来固定为 1 的权重，换成可学习、且依赖输入内容的注意力权重**。"选择性关注"？这不就是注意力机制的由来吗。（Karpathy大神：《Attention is All You Need》的含金量还在上升）。

它的核心公式如下：

$$
h_{l} = a_{0 \rightarrow l} \cdot h_{1} + \sum_{i = 1}^{l - 1} a_{i \rightarrow l} \cdot f_{i}(h_{i})
$$

这个公式看起来和原始残差的展开式很像，但有几个关键改进：

1. **引入注意力权重** $a_{0 \rightarrow l}$：这是一个 0 到 1 之间的数值，且所有 $a_{i \rightarrow l}$ 的和为 1（通过 softmax 归一化实现）。它代表第 $l$ 层对第 $i$ 层信息的关注程度。重要的层会被赋予高权重（比如 0.8），不重要的层权重接近 0。

2. **定义键值对与查询**：为了计算注意力权重，每个层都有自己的 "查询" Q，每个前序层都有对应的 "键" K 和 "值" V：
   - 查询 $q_{l} = w_{l}$：$w_{l}$ 是第 $l$ 层的可学习向量（相当于这一层的 "兴趣偏好"）。每一次都可以对前面发出询问："你的信息对我来说重要吗？"
   - 键 $k_{i}$ 和值 $v_{i}$：当 $i=0$ 时，$v_{0} = h_{1}$（初始嵌入）；当 $i \ge 1$ 时，$k_{i} = v_{i} = f_{i}(h_{i})$（前序层的变换输出）。可以直接理解为Transformer中的Q，K，V，机制大同小异。

3. **注意力权重计算**：通过查询和键的相似度计算权重，再用 softmax 归一化：

$$
a_{i \rightarrow l} = \frac{\phi(q_{l},k_{i})}{\sum_{j = 0}^{l - 1}\phi(q_{l},k_{j})},\quad \phi(q,k) = \exp(q^{\top}\text{RMSNorm}(k))
$$

这里的 RMSNorm 是为了防止某些层的输出数值过大而垄断注意力，确保权重计算的公平性。

形象地说，Full AttnRes 就像给每一层配备了一个 "信息筛选器"：第 $l$ 层会带着自己的 "兴趣偏好"（$q_{l}$），逐一查看所有前序层的 "简历"（$k_{i}$），然后给每个前序层打分（$a_{i \rightarrow l}$），最后只重点吸收高分层的信息。这样就不会被无关信息稀释核心内容。

是不是就是把Transformer的内部机制搬到Resnet中来了？

### 2.2 系统开销：理想很丰满，现实有挑战

Full AttnRes 的效果很好，但在大规模模型训练中面临一个关键问题 —— **开销过大**。

从计算量来看，每个层都要和所有前序层计算注意力相似度，这会带来 $O(L^2 d)$ 的计算成本（L 是层数，d 是隐藏层维度）。不过好在 LLM 的层数通常在几百层（远小于序列长度），这个计算成本还能接受。

真正的问题在**内存和通信**：为了让第 $l$ 层能访问所有前序层的输出，这些输出必须被全程保存，而不能像原始残差网络那样计算后就释放（或后续重新计算）。这会带来 $O(Ld)$ 的额外内存开销 —— 对于具有千亿参数的大模型，$Ld$ 的数值会非常庞大，现有硬件很难承载。

更麻烦的是分布式训练场景：在流水线并行训练中，不同层可能分布在不同的 GPU 或服务器上，Full AttnRes 需要频繁传输所有前序层的输出，通信开销会随着层数线性增长，严重拖慢训练速度。

---
## 3. Block Attention Residuals

Block Attention Residuals 在上图(c)中展示。为了解决 Full AttnRes 的开销问题，Kimi 团队提出了 Block AttnRes，核心思路是 "分组聚合"：把连续的多层打包成一个 "块"（Block），只在块之间做注意力选择，从而大幅降低开销。

### 3.1 核心原理

Block AttnRes 的流程可以分为两步：**块内累积**和**块间注意力**。

#### 第一步：块内累积

首先将整个网络的 $L$ 层分成 $N$ 个块（每个块有 $S = L/N$ 层），比如把 100 层分成 10 个块，每个块 10 层。

对于每个块 $n$，我们先把块内所有层的输出汇总成一个 "块表征"：$b_n = \sum_{j \in B_n} f_j(h_j)$，其中 $B_n$ 是第 $n$ 块包含的层索引集合。这个过程就像小组讨论：每个小组（块）内部先把所有人的观点汇总成一个核心结论（块表征），而不是把每个人的发言都直接提交给决策者。

对于块内尚未完成的层（比如第 $n$ 块的第 $i$ 层，$i < S$），我们会维护一个 "部分和" $b_n^i$（前 $i$ 层的输出和），确保块内层也能访问到本块已完成层的信息。

#### 第二步：块间注意力

当计算某个层的输入时，不再访问所有前序层，而是访问：
- 所有已完成块的块表征（$b_0, b_1, \dots, b_{n-1}$，其中 $b_0 = h_1$ 是初始嵌入）
- 本块的部分和（如果是块内第 2 层及以后）

其核心公式根据层的位置不同分为两种情况：
- 块内第 1 层（$i=1$）：只能访问前面所有块的表征 $V = [b_0, b_1, \dots, b_{n-1}]^\top$
- 块内第 2 层及以后（$i \ge 2$）：除了前面的块表征，还能访问本块的部分和 $V = [b_0, b_1, \dots, b_{n-1}, b_n^{i-1}]^\top$

这里的 $V$ 是注意力机制的 "值矩阵"，注意力权重的计算方式和 Full AttnRes 一致（用层的查询 $w_l$ 和块表征的键计算相似度）。

通过这种设计，内存和通信开销从 Full AttnRes 的 $O(Ld)$ 降到了 $O(Nd)$（$N$ 是块数）。Kimi 团队发现，当 $N \approx 8$ 时，就能保留 Full AttnRes 的大部分效果 —— 这意味着开销降低了一个数量级（比如从 100 层降到 8 块），却几乎不损失性能。

### 3.2 论文中的伪代码解析

Kimi 团队在论文中提供了 PyTorch 风格的伪代码，我们来逐行拆解核心逻辑（已添加中文注释）：

```python
def block_attn_res(blocks: list[Tensor], partial_block: Tensor, proj: Linear, norm: RMSNorm) -> Tensor:
    """
    计算块注意力残差：核心是对块表征做softmax注意力
    参数说明：
    - blocks: 已完成的块表征列表，形状为[N, B, T, D]（N=块数，B=批次，T=序列长度，D=隐藏维度）
    - partial_block: 当前块的部分和（已完成层的输出和），形状为[B, T, D]
    - proj: 线性投影层（对应learned pseudo-query w_l）
    - norm: RMSNorm层，用于归一化键
    """
    # 1. 拼接所有可用源：已完成块 + 当前块部分和
    V = torch.stack(blocks + [partial_block])  # 形状变为[N+1, B, T, D]
    # 2. 对值矩阵做RMSNorm，防止数值偏差
    K = norm(V)
    # 3. 计算注意力分数：伪查询（proj.weight）与键的相似度
    logits = torch.einsum('d, n b t d -> n b t', proj.weight.squeeze(), K)
    # 4. softmax归一化得到注意力权重，再与值矩阵加权求和
    h = torch.einsum('n b t, n b t d -> b t d', logits.softmax(0), V)
    return h

def forward(self, blocks: list[Tensor], hidden_states: Tensor) -> tuple[list[Tensor], Tensor]:
    """
    前向传播：处理单个Transformer层（注意力+MLP）
    """
    partial_block = hidden_states  # 初始化当前块的部分和为输入状态
    # 第一步：在注意力层之前应用块AttnRes
    h = block_attn_res(blocks, partial_block, self.attn_res_proj, self.attn_res_norm)
    # 检查是否达到块边界（每个块包含ATTN+MLP两层，所以块大小//2）
    if self.layer_number % (self.block_size // 2) == 0:
        blocks.append(partial_block)  # 完成一个块，将部分和加入块列表
        partial_block = None  # 重置部分和
    # 执行自注意力层
    attn_out = self.attn(self.attn_norm(h))
    # 更新当前块的部分和（累加注意力层输出）
    partial_block = partial_block + attn_out if partial_block is not None else attn_out

    # 第二步：在MLP层之前再次应用块AttnRes
    h = block_attn_res(blocks, partial_block, self.mlp_res_proj, self.mlp_res_norm)
    # 执行MLP层
    mlp_out = self.mlp(self.mlp_norm(h))
    # 再次更新部分和（累加MLP层输出）
    partial_block = partial_block + mlp_out

    return blocks, partial_block
```

这个伪代码的核心逻辑很清晰：
每个 Transformer 层（注意力 + MLP）执行前，都会通过 block_attn_res 选择相关的块表征和部分和；
当完成一个块的所有层（注意力 + MLP）后，就把该块的部分和存入块列表，供后续层使用；
整个过程中，块表征的数量始终保持在 $N$ 左右，确保内存开销可控。

---
## 4. 实验结果：AttnRes 到底有多强？
Kimi 团队在从几百万参数到 480 亿参数的模型上做了全面实验，结果证明 AttnRes 的提升是显著且稳定的。

<img src="assets/images/AttnRes/Result.png" alt="Result" height="60%" width="60%">

### 4.1 核心指标
- 计算效率：Block AttnRes 的效果相当于用 1.25 倍计算量训练的原始残差网络。也就是说，用相同的算力，AttnRes 能让模型达到更好的效果；
- 训练稳定性：AttnRes 解决了原始残差网络的数值增长问题，隐藏状态的数值被控制在稳定范围内，梯度分布也更均匀 —— 这意味着训练过程更平稳，不容易出现崩溃；
- 下游任务表现：在 480 亿参数的 Kimi Linear 模型上（预训练 1.4 万亿 tokens），AttnRes 在所有评测任务中都超过了原始残差网络：
- 多步推理任务（如 GPQA-Diamond）提升最明显，达 7.5 个百分点；
- 数学任务（如 Minerva Math）提升 3.6 个百分点；
- 代码生成（如 HumanEval）提升 3.1 个百分点；
- 通用知识任务（如 MMLU）提升 1.1 个百分点。
- 这些结果印证了 AttnRes 的核心价值：改善深度方向的信息流动，尤其有利于需要多步推理、信息整合的复杂任务。

### 4.2 Ablation 实验
为了验证 AttnRes 的核心设计，Kimi 团队做了 ablation 实验（逐一移除或替换某个组件，观察效果变化）：

- 移除输入依赖的注意力权重，改用固定权重：性能明显下降，证明 "输入依赖的选择性" 是关键；
- 用 sigmoid 替代 softmax 做归一化：性能下降，说明 softmax 的 "竞争选择"（让重要源获得更高权重）比 sigmoid 的 "独立判断" 更有效；
- 移除 RMSNorm：性能下降，证明归一化能有效防止某些源垄断注意力；
- 块大小实验：当块数 $N=8$ 时效果接近 Full AttnRes，块数过少（如 $N=2$）则效果明显下降。
- 这些实验说明，AttnRes 的成功不是单一组件的功劳，而是 "输入依赖注意力 + softmax 竞争 + RMSNorm 归一化 + 合理块划分" 的综合效果。

## 5. 参考
1. https://arxiv.org/pdf/2603.15031
2. https://kexue.fm/archives/11664

---
**作者**: 陈羿铭

**发布于**: 2026.3.22