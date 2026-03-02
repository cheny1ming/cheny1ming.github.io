# Blogs 框架使用说明

## 📁 文件结构

```
Blogs/
├── index.html              # 博客首页
├── timeline.html           # 时间线页面
├── categories.html         # 分类页面
├── tags.html               # 标签页面
├── post.html               # 文章详情页
├── assets/
│   └── js/
│       └── blogs-data.js   # 文章元数据配置
└── posts/                  # Markdown 文章文件夹
    └── _template.md        # 文章模板
```

---

## ✍️ 如何添加新文章

### 1. 创建 Markdown 文件

在 `posts/` 文件夹中创建一个新的 `.md` 文件，例如 `my-first-post.md`。

可以使用 `_template.md` 作为模板，或者参考以下格式：

```markdown
# 文章标题

> 文章简介

## 正文内容

这里是你的文章内容...

### 代码示例

```python
print("Hello, World!")
```

## 结论

总结...
```

### 2. 添加文章元数据

打开 `assets/js/blogs-data.js`，在 `posts` 数组中添加文章信息：

```javascript
{
    id: "my-first-post",                    // 唯一标识符（英文，无空格）
    title: {
        en: "My First Post",                 // 英文标题
        zh: "我的第一篇文章"                  // 中文标题
    },
    description: {
        en: "A brief description...",       // 英文简介
        zh: "简短描述..."                     // 中文简介
    },
    date: "2025-01-15",                      // 发布日期
    category: "learning-notes",              // 分类: learning-notes / project / essay
    tags: ["MLLMs", "CV"],                   // 标签数组
    mdFile: "posts/my-first-post.md",        // Markdown 文件路径
    author: "Yiming Chen",                   // 作者（可选，默认为 Yiming Chen）
    readTime: "8 min"                        // 阅读时间（可选）
}
```

### 3. 可用分类

- `learning-notes` - 学习笔记（蓝色）
- `project` - 项目记录（绿色）
- `essay` - 随笔（紫色）

### 4. 可用标签

- `MLLMs` - 多模态大模型
- `CV` - 计算机视觉
- `LLM` - 大语言模型
- `RLHF` - 人类反馈强化学习
- `Training` - 训练/推理框架
- `Spatial` - 空间智能

如需添加新标签，请在 `blogs-data.js` 的 `availableTags` 数组中添加。

---

## 🎨 自定义配置

### 修改分类

在 `blogs-data.js` 中修改 `categories` 对象：

```javascript
categories: {
    "your-category": {
        icon: "fa-solid fa-icon",           // Font Awesome 图标类名
        color: "blue",                       // 颜色主题
        name: {
            en: "Category Name",
            zh: "分类名称"
        },
        description: {
            en: "Description",
            zh: "描述"
        }
    }
}
```

### 添加新标签

在 `blogs-data.js` 的 `availableTags` 数组中添加：

```javascript
{
    id: "your-tag",                          // 标签 ID
    name: {
        en: "Tag Name",                      // 英文名称
        zh: "标签名称"                        // 中文名称
    },
    color: "blue"                            // 颜色主题
}
```

---

## 📝 Markdown 语法支持

文章详情页支持完整的 Markdown 语法，包括：

- 标题（H1-H6）
- 段落和换行
- **粗体** 和 *斜体*
- [链接](https://example.com)
- 图片
- 列表（有序/无序）
- 代码块（支持语法高亮）
- 引用
- 表格
- 分隔线

---

## 🌐 语言切换

Blogs 页面会自动使用主页设置的语言（中文/英文）。

确保每篇文章在 `blogs-data.js` 中都有中英文的标题和描述。

---

## 🎯 主题切换

Blogs 页面会自动使用主页设置的主题（浅色/深色）。

主题切换会立即应用到所有 Blogs 页面。

---

## 📊 数据统计

框架提供了以下工具函数：

- `BLOG_DATA.getAllPosts()` - 获取所有文章
- `BLOG_DATA.getLatestPosts(count)` - 获取最新 N 篇文章
- `BLOG_DATA.getPostsByCategory(category)` - 按分类获取文章
- `BLOG_DATA.getPostsByTag(tag)` - 按标签获取文章
- `BLOG_DATA.getPostsByYear(year)` - 按年份获取文章
- `BLOG_DATA.formatDate(dateStr, lang)` - 格式化日期

---

## 🚀 部署

整个 Blogs 框架是纯静态的，可以直接部署到：

- GitHub Pages
- Netlify
- Vercel
- 任何静态网站托管服务

无需后端服务器或数据库！

---

## ❓ 常见问题

### Q: 如何修改首页显示的最新文章数量？

A: 在 `index.html` 中修改 `BLOG_DATA.getLatestPosts(10)` 中的数字。

### Q: 如何添加图片？

A: 将图片放在 `Blogs/assets/images/` 文件夹中，然后在 Markdown 中引用：
```markdown
![图片描述](../assets/images/your-image.jpg)
```

### Q: 如何预览本地修改？

A: 使用 Live Server 或类似工具打开 `Blogs/index.html`。

---

## 📞 支持

如有问题，请联系：yiming.chen@example.com
