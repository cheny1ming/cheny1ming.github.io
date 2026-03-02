/**
 * Blogs Data Configuration
 * 文章元数据配置
 * 添加新文章时，请在此文件中添加文章信息，并将对应的 .md 文件放入 posts/ 文件夹
 */

const BLOG_DATA = {
    // ==================== 文章列表 ====================
    posts: [
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
            date: "2026-03-02",
            modifiedDate: "2026-03-02",
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
    }
};
