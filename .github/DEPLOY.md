# GitHub Pages 部署说明

## 工作流程

GitHub Actions 会在以下情况自动部署：
- 推送代码到 `main` 分支
- 手动触发工作流

## 部署步骤

### 1. 启用 GitHub Pages

1. 进入仓库 **Settings** > **Pages**
2. Source 选择 **GitHub Actions**

### 2. 配置权限

1. 进入 **Settings** > **Actions** > **General**
2. 在 **Workflow permissions** 中选择 **Read and write permissions**

## 代码检查

工作流会自动检查：
- JSON 文件语法（`js/i18n.json`）
- HTML 文件结构

## 查看部署状态

- 在 **Actions** 标签页查看工作流运行状态
- 部署成功后访问: `https://cheny1ming.github.io/` (请替换为你的用户名)
