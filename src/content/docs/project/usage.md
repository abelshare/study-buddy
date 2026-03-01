---
title: 使用指南
description: 详细了解如何安装、配置和使用 StudyBuddy
---

## 什么是 StudyBuddy

StudyBuddy 是一个 **AI 驱动的个人知识成长伙伴**，帮助你将碎片化学习转化为结构化知识体系。

> **核心理念：AI 时代，会管比会做更有直接价值**

核心特点：
- **对话式学习** - AI 引导你掌握框架和必要细节，而非灌输式输出
- **类比优先** - 用已知解释未知，与你背景建立连接
- **按需沉淀** - 只有你确认「学到了」才生成文档
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

## 使用 AI 对话式学习

StudyBuddy 采用 **对话式学习** 模式，AI 会引导你逐步掌握知识，而非一次性输出大量内容。

### 快速开始

在 Qoder 对话中输入：

```
/learning-master Docker
```

AI 将进入对话式学习流程：

```
/learning-master Docker
    ↓
入口判断（歧义？已有文档？）
    ↓
背景分析（调用 background-analyzer）
    ↓
对话式引导：
  → 确认学习目标
  → 建立框架 + 类比
  → 必要细节（按需深入）
  → 实战导向
    ↓
用户确认「学到了」
    ↓
调用 knowledge-sync 沉淀文档
```

### 架构说明

**核心 Skill（2个）**：

| Skill | 功能 | 触发方式 |
|-------|------|----------|
| `learning-master` | 主控协调，对话式学习引导 | `/learning-master {主题}` |
| `knowledge-sync` | 知识沉淀，生成/更新文档 | 由 learning-master 调用 |

**子代理（2个，按需调用）**：

| 代理 | 功能 | 触发时机 |
|-------|------|----------|
| `background-analyzer` | 分析已学知识，生成类比建议 | 进入学习流程时 |
| `freshness-checker` | 检测知识新鲜度，搜索最新版本 | 新技术/新版本主题 |

### 学习闭环

```
认知 → 决策 → 执行 → 验证 → 沉淀
```

### 对话交互示例

```
📚 开始学习：Docker

基于你的背景分析：
- 你已掌握：Linux基础、Git
- 可类比：镜像 ≈ 虚拟机快照
- 建议跳过：基础命令行操作
- 重点放在：容器编排、生产实践

这个学习路径可以吗？
```

你的反馈会影响后续内容：

| 你的反馈 | AI 行为 |
|---------|--------|
| 「懂了」「明白了」 | 进入下一阶段或触发沉淀 |
| 「不太懂」 | 换个角度、换个类比 |
| 「这个我知道」 | 跳过，继续下一部分 |
| 「太细了」 | 回到框架层面 |
| 「想深入」 | 补充更多细节 |
| 「可以沉淀了」 | 触发 knowledge-sync |

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

### 文档组织原则

**按知识块组织，不按行数拆分**：

```
if 知识量少（内容短，知识块少）:
    → 单文件：src/content/docs/{category}/{slug}.md

elif 知识量多（内容长，知识块多）:
    → 目录结构：
      src/content/docs/{category}/{slug}/
      ├── index.md        # 概览 + 导航
      ├── {block1}.md     # 知识块1
      └── {block2}.md     # 知识块2
```

**图文结合**：

| 内容类型 | 配图方式 |
|---------|----------|
| 核心概念 | 脑图（mindmap） |
| 流程步骤 | 流程图（flowchart） |
| 对比选型 | 表格 |
| 关键代码 | 代码块 + 注释 |

### 工具类文档模板

```markdown
---
title: 工具名称
description: 一句话描述
---

## 一句话定义

{这个工具是什么、解决什么问题}

## 核心概念

| 概念 | 说明 | 类比 |
|------|------|------|

## 快速上手

```bash
# 最常用的命令
```

## 决策点

| 场景 | 选择 | 理由 |
|------|------|------|

## 常见坑

1. **坑1**：描述 + 解决方案
```

### 领域类文档模板

```markdown
---
title: 领域名称
description: 一句话描述
---

## 一句话定义

{这个领域是什么}

## 技术版图

```mermaid
mindmap
  root((领域))
    分支1
    分支2
```

## 核心概念

### 概念1

{说明}

## 选型依据

| 考虑因素 | 选择A | 选择B |
|---------|-------|-------|
```

### 方法论类文档模板

```markdown
---
title: 方法名称
description: 一句话描述
---

## 一句话定义

{这个方法是什么}

## 核心步骤

1. **步骤1**：说明
2. **步骤2**：说明

## 适用场景

✅ 适合：场景1、场景2
❌ 不适合：场景3

## 典型误区

1. **误区1**：说明 + 正确做法
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

除了对话式学习沉淀，你也可以手动创建文档。

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
- 探索 [AI Skill 规格](/project/ai-skills/) 了解对话式学习架构
