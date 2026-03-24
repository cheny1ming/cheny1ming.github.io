/**
 * Blogs Data Configuration
 * 文章元数据配置
 * 添加新文章时，请在此文件中添加文章信息，并将对应的 .md 文件放入 posts/ 文件夹
 */

const BLOG_DATA = {
    // ==================== 文章列表 ====================
    posts: [
        {
            id: "vae",
            title: {
                en: "VAE: Variational Auto-Encoder",
                zh: "VAE 变分自编码器"
            },
            description: {
                en: "A comprehensive guide to Variational Auto-Encoders (VAE), covering the evolution from Auto-Encoder, VAE architecture, reparameterization trick, ELBO loss function, and complete training workflow. Understand how VAE enables generative modeling through probabilistic latent spaces.",
                zh: "深入解析变分自编码器（VAE），从自编码器的基础讲到VAE的改进，全面剖析VAE架构、重参数技巧、ELBO损失函数以及完整的训练流程。理解VAE如何通过概率化隐空间实现生成式建模。"
            },
            date: "2026-03-24",
            modifiedDate: "2026-03-24",
            category: "paper-with-code",
            tags: ["Diffusion", "ImageGen", "CV"],
            mdFile: "posts/VAE.md",
            author: "Yiming Chen",
            paperUrl: "https://arxiv.org/abs/1312.6114",
            headerImage: "assets/images/VAE/VAE.png"
        },
        {
            id: "attnres",
            title: {
                en: "AttnRes: Teaching Residual Networks 'Selective Memory'",
                zh: "Kimi 新作 AttnRes：让残差网络学会 \"选择性记忆\""
            },
            description: {
                en: "An in-depth analysis of Kimi's groundbreaking AttnRes paper, which revolutionizes residual networks by introducing attention mechanisms to the residual path. Explore Full Attention and Block Attention variants, their mathematical foundations, and significant performance improvements in large language models.",
                zh: "深入解析 Kimi 团队的突破性 AttnRes 论文，通过在残差路径引入注意力机制，革新了沿用十几年的残差网络范式。全面剖析 Full Attention 和 Block Attention 两种变体、数学原理以及在大语言模型中的显著性能提升。"
            },
            date: "2026-03-22",
            modifiedDate: "2026-03-22",
            category: "paper-with-code",
            tags: ["Transformer", "LLM"],
            mdFile: "posts/AttnRes.md",
            author: "Yiming Chen",
            paperUrl: "https://arxiv.org/pdf/2603.15031",
            headerImage: "assets/images/AttnRes/AttnRes_overview.png"
        },
        {
            id: "optimizer",
            title: {
                en: "Optimizer: From BGD to AdamW",
                zh: "优化器全解析：从BGD到AdamW"
            },
            description: {
                en: "A comprehensive guide to deep learning optimizers, covering the evolution from Batch Gradient Descent through SGD, Momentum, AdaGrad, RMSprop, Adam, to AdamW. Understand the intuition and mathematics behind each optimizer.",
                zh: "系统梳理深度学习优化器的完整演进脉络，从BGD、SGD、Momentum、AdaGrad、RMSprop到Adam和AdamW，深入理解每一代优化器的设计思路与数学本质。"
            },
            date: "2026-03-02",
            modifiedDate: "2026-03-06",
            category: "learning-notes",
            tags: ["LLM"],
            mdFile: "posts/优化器解析.md",
            author: "Yiming Chen"
        },
        {
            id: "vit",
            title: {
                en: "Vision Transformer: From Architecture to Implementation",
                zh: "重温经典之ViT：从架构到实现的全面解析"
            },
            description: {
                en: "A comprehensive guide to Vision Transformer (ViT), covering its connection to BERT, image processing pipeline, positional encoding, complete workflow, and limitations. Understand how ViT revolutionized computer vision by applying Transformer to visual tasks.",
                zh: "深入解析Vision Transformer的核心原理，从与BERT的架构联系、图像patch化处理、位置编码到完整工作流程，全方位拆解这一打破CNN主导地位的经典视觉模型。"
            },
            date: "2026-03-07",
            modifiedDate: "2026-03-07",
            category: "paper-with-code",
            tags: ["Transformer", "CV", "MLLMs"],
            mdFile: "posts/ViT.md",
            author: "Yiming Chen",
            paperUrl: "https://arxiv.org/abs/2010.11929",
            codeUrl: "https://github.com/cheny1ming/Paper-with-Code/tree/main/ViT",
            headerImage: "assets/images/ViT/VIT.png"
        },
        {
            id: "clip",
            title: {
                en: "CLIP: The Pioneer of Multimodal Learning",
                zh: "CLIP解读：多模态的开山之作"
            },
            description: {
                en: "An in-depth analysis of CLIP (Contrastive Language-Image Pre-training), OpenAI's groundbreaking multimodal model that bridges vision and language through contrastive learning. Explore its dual-encoder architecture, training methodology, zero-shot capabilities, and limitations.",
                zh: "深入解析CLIP（对比语言-图像预训练）模型，通过对比学习实现视觉与语言的语义对齐。全面拆解其双塔架构、训练方法、零样本推理能力以及局限性。"
            },
            date: "2026-03-10",
            modifiedDate: "2026-03-13",
            category: "paper-with-code",
            tags: ["MLLMs", "CV", "Transformer"],
            mdFile: "posts/CLIP.md",
            author: "Yiming Chen",
            paperUrl: "https://arxiv.org/abs/2103.00020",
            codeUrl: "https://github.com/cheny1ming/Paper-with-Code/tree/main/CLIP",
            headerImage: "assets/images/CLIP/cover.png"
        },
        {
            id: "welcome-to-my-blog",
            title: {
                en: "Hello, Welcome to Yiming's Blog",
                zh: "你好，欢迎来到 羿铭 的博客"
            },
            description: {
                en: "Finally, my blog is officially launching! I'll be sharing learning notes, insights, and thoughts about LLMs here. Looking forward to growing together with everyone~",
                zh: "哈喽哈喽～各位小伙伴！我是羿铭，终于终于，我的博客正式和大家见面啦🥳 这里记录了我在大模型学习路上的点点滴滴，欢迎来串门！"
            },
            date: "2026-02-20",
            modifiedDate: "2026-02-24",
            category: "essay",
            tags: ["journal"],
            mdFile: "posts/welcome-to-my-blog.md",
            author: "Yiming Chen"
        }
    ],

    // ==================== 分类配置 ====================
    categories: {
        "learning-notes": {
            icon: "fa-solid fa-book-open",
            color: "blue",
            name: {
                en: "Learning Notes",
                zh: "学习笔记"
            },
            description: {
                en: "Technical notes and learning materials",
                zh: "技术笔记与学习资料"
            }
        },
        "paper-with-code": {
            icon: "fa-solid fa-file-code",
            color: "cyan",
            name: {
                en: "Paper with Code",
                zh: "论文精读➕复现"
            },
            description: {
                en: "Paper reading and code reproduction",
                zh: "论文精读与代码复现"
            }
        },
        "technical-report": {
            icon: "fa-solid fa-file-lines",
            color: "amber",
            name: {
                en: "Technical Report",
                zh: "技术报告"
            },
            description: {
                en: "Technical research and analysis reports",
                zh: "技术研究与分析报告"
            }
        },
        "project": {
            icon: "fa-solid fa-rocket",
            color: "green",
            name: {
                en: "Projects",
                zh: "项目记录"
            },
            description: {
                en: "Project documentation and summaries",
                zh: "项目文档与总结"
            }
        },
        "essay": {
            icon: "fa-solid fa-pen-fancy",
            color: "purple",
            name: {
                en: "Essays",
                zh: "随笔"
            },
            description: {
                en: "Thoughts and random musings",
                zh: "思考与随笔"
            }
        }
    },

    // ==================== 标签列表 ====================
    // 可用标签，用于标签云显示
    availableTags: [
        { id: "MLLMs", name: { en: "MLLMs", zh: "多模态大模型" }, color: "blue" },
        { id: "CV", name: { en: "CV", zh: "计算机视觉" }, color: "green" },
        { id: "LLM", name: { en: "LLM", zh: "大语言模型" }, color: "purple" },
        { id: "RLHF", name: { en: "RLHF", zh: "人类反馈强化学习" }, color: "red" },
        { id: "Training", name: { en: "Training/Inference", zh: "训练/推理框架" }, color: "orange" },
        { id: "Spatial", name: { en: "Spatial Intelligence", zh: "空间智能" }, color: "indigo" },
        { id: "Transformer", name: { en: "Transformer", zh: "Transformer" }, color: "teal" },
        { id: "Diffusion", name: { en: "Diffusion", zh: "扩散模型" }, color: "rose" },
        { id: "ImageGen", name: { en: "Image/Video Generation", zh: "图像/视频生成" }, color: "cyan" },
        { id: "journal", name: { en: "Journal", zh: "随笔" }, color: "pink" }
    ],

    // ==================== 工具函数 ====================
    // 获取所有文章（按日期降序）
    getAllPosts: function() {
        return this.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    },

    // 获取最新N篇文章
    getLatestPosts: function(count = 10) {
        return this.getAllPosts().slice(0, count);
    },

    // 根据ID获取文章
    getPostById: function(id) {
        return this.posts.find(post => post.id === id);
    },

    // 根据分类获取文章
    getPostsByCategory: function(category) {
        return this.posts.filter(post => post.category === category)
                         .sort((a, b) => new Date(b.date) - new Date(a.date));
    },

    // 根据标签获取文章
    getPostsByTag: function(tag) {
        return this.posts.filter(post => post.tags.includes(tag))
                         .sort((a, b) => new Date(b.date) - new Date(a.date));
    },

    // 获取文章的所有年份（用于时间线）
    getYears: function() {
        const years = [...new Set(this.posts.map(post => new Date(post.date).getFullYear()))];
        return years.sort((a, b) => b - a);
    },

    // 根据年份获取文章
    getPostsByYear: function(year) {
        return this.posts.filter(post => new Date(post.date).getFullYear() === year)
                         .sort((a, b) => new Date(b.date) - new Date(a.date));
    },

    // 获取上一篇文章
    getPreviousPost: function(currentId) {
        const sortedPosts = this.getAllPosts();
        const currentIndex = sortedPosts.findIndex(post => post.id === currentId);
        return currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
    },

    // 获取下一篇文章
    getNextPost: function(currentId) {
        const sortedPosts = this.getAllPosts();
        const currentIndex = sortedPosts.findIndex(post => post.id === currentId);
        return currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;
    },

    // 格式化日期
    formatDate: function(dateStr, lang = 'en') {
        const date = new Date(dateStr);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', options);
    },

    // 获取文章的显示日期（修改日期或发布日期）
    getDisplayDate: function(post) {
        return post.modifiedDate || post.date;
    },

    // 检查文章是否有修改日期
    hasModifiedDate: function(post) {
        return !!post.modifiedDate;
    },

    // 获取标签的显示名称（支持多语言）
    getTagName: function(tagId, lang = 'en') {
        const tag = this.availableTags.find(t => t.id === tagId);
        return tag ? tag.name[lang] || tag.name['en'] : tagId;
    }
};
