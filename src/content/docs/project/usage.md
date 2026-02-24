---
title: 使用指南
description: 详细了解如何安装、配置和使用 StudyBuddy
---

## 什么是 StudyBuddy

StudyBuddy 是一个 **AI 驱动的个人知识成长伙伴**，帮助你将碎片化学习转化为结构化知识体系。

核心特点：
- **AI 自动生成** - 输入主题，自动生成结构化学习文档
- **三阶段学习** - 概览(5分钟) → 详解(60分钟) → 实战(25分钟)
- **知识图谱** - 可视化展示知识点之间的关联
- **管理者视角** - 关注「何时用」而非「怎么实现」

## 安装与运行

### 环境要求

- Node.js 18+
- pnpm（推荐）或 npm

### 安装步骤

```bash
# 1. 克隆项目
git clone <your-repo-url>
cd study-partner

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器
pnpm dev
```

启动后访问 `http://localhost:4321` 查看文档站点。

### 构建部署

```bash
# 构建静态站点
pnpm build

# 预览构建结果
pnpm preview
```

构建产物在 `dist/` 目录，可部署到任意静态托管服务。

## 使用 AI 生成文档

StudyBuddy 集成了 6 个 AI Skill，可在 Qoder 中自动生成学习文档。

### 快速开始

在 Qoder 对话中输入：

```
/learning-master TypeScript
```

AI 将自动完成以下流程：

```
用户输入主题
    ↓
topic-analyzer（主题分析）
    ↓
outline-planner（大纲规划）
    ↓
content-writer（内容生成）
    ↓
visual-designer（图表设计）
    ↓
quality-checker（质量检查）
    ↓
输出完整文档
```

### AI Skill 说明

| Skill | 功能 | 输出 |
|-------|------|------|
| `learning-master` | 主控调度 | 协调各 Skill |
| `topic-analyzer` | 主题分析 | 复杂度、分类、前置知识 |
| `outline-planner` | 大纲规划 | 三阶段学习框架 |
| `content-writer` | 内容生成 | Markdown 文档 |
| `visual-designer` | 图表设计 | Mermaid 图表 |
| `quality-checker` | 质量检查 | 评分报告 |

### 生成选项

```
# 指定难度
/learning-master TypeScript --level beginner

# 指定分类
/learning-master TypeScript --category tools

# 生成指定章节
/learning-master TypeScript --section overview
```

## 文档结构

### 目录组织

```
src/content/docs/
├── index.mdx          # 首页
├── tools/             # 工具类文档
│   ├── index.md
│   └── getting-started.md
├── domains/           # 领域类文档
│   └── index.md
├── methods/           # 方法论文档
│   └── index.md
└── project/           # 项目设计文档
    ├── index.md
    ├── brief.md
    ├── requirements.md
    ├── architecture.md
    ├── ai-skills.md
    └── usage.md       # 本文档
```

### 文档模板

每个学习主题遵循统一模板：

```markdown
---
title: 主题名称
description: 一句话描述
---

## 概览（5分钟）

### 一句话定义
### 核心问题
### 适用场景
### 前置知识
### 思维导图

## 详解（60分钟）

### 章节 1
#### 是什么
#### 为什么
#### 怎么用

### 章节 2
...

## 实战（25分钟）

### 初级练习
### 中级练习
### 高级练习

## 速查表
```

## 浏览与搜索

### 导航方式

1. **侧边栏导航** - 按分类浏览全部文档
2. **搜索功能** - 点击右上角搜索图标，输入关键词
3. **知识图谱** - 页面底部的 Graph View，可视化探索关联

### 知识图谱使用

Graph View 展示文档之间的链接关系：
- **节点** - 每个文档是一个节点
- **连线** - 文档间的引用关系
- **交互** - 点击节点跳转，滚轮缩放，拖拽平移

## 手动添加文档

除了 AI 生成，你也可以手动创建文档。

### 创建新文档

1. 在对应分类目录下创建 `.md` 文件
2. 添加 frontmatter（必须包含 title 和 description）
3. 按模板编写内容

```markdown
---
title: 我的新文档
description: 文档描述
---

正文内容...
```

### 使用组件

**难度标签：**

```astro
import SkillLevel from '@/components/SkillLevel.astro';

<SkillLevel level="beginner" />  <!-- 🌱 入门 -->
<SkillLevel level="intermediate" />  <!-- 🌿 中级 -->
<SkillLevel level="advanced" />  <!-- 🌳 高级 -->
```

**速查表：**

```astro
import Cheatsheet from '@/components/Cheatsheet.astro';

<Cheatsheet 
  title="Git 常用命令"
  items={[
    { key: 'git status', value: '查看状态' },
    { key: 'git add .', value: '暂存所有' },
  ]}
/>
```

### 添加 Mermaid 图表

直接在 Markdown 中使用代码块：

````markdown
```mermaid
graph LR
    A[开始] --> B[处理]
    B --> C[结束]
```
````

支持的图表类型：
- `graph` / `flowchart` - 流程图
- `sequenceDiagram` - 时序图
- `mindmap` - 思维导图
- `classDiagram` - 类图
- `stateDiagram` - 状态图

## 常见问题

### Mermaid 图表不显示？

确保 `astro.config.mjs` 中已配置 `astro-mermaid` 插件。

### Graph View 不显示？

Graph View 需要页面间存在链接关系才会显示连线。使用 `[[wiki-link]]` 或标准 Markdown 链接建立关联。

### 如何修改主题色？

编辑 `src/styles/custom.css` 中的 CSS 变量：

```css
:root {
  --sb-primary: #4f46e5;  /* 主色 */
  --sb-secondary: #10b981;  /* 强调色 */
}
```

### 构建失败？

检查所有 `.md` 文件的 frontmatter 格式是否正确，必须包含 `title` 字段。

## 下一步

- 阅读 [项目简介](/project/brief/) 了解设计理念
- 查看 [技术架构](/project/architecture/) 了解系统设计
- 探索 [AI Skill 规范](/project/ai-skills/) 了解自动化流程
