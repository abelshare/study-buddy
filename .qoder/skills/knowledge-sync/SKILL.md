---
name: knowledge-sync
description: 知识同步技能，由learning-master在用户确认"学到了"后调用。将学习成果沉淀为文档，支持新建和更新两种模式。
---

# knowledge-sync

## 触发方式

由 `learning-master` 调用，不可单独触发。

---

## 输入

```yaml
# 必填
topic: string           # 学习主题
type: tools|domains|methods  # 知识类型
framework: string       # 框架理解（一句话定义、核心概念）
key_decisions: []       # 决策点列表
analogies: []           # 类比关系

# 可选
pitfalls: []            # 踩坑记录
commands: []            # 核心命令（工具类）
tech_relations: {}      # 技术关系（领域类）
migration_tips: []      # 迁移建议（方法论类）
source_version: string  # 学习时的版本
```

---

## 输出

```yaml
status: success|failed
file_path: string       # 文档路径
action: created|updated # 新建还是更新
```

---

## 执行步骤

### 1. 检查已有文档

```
if 存在:
    → 更新模式：读取现有内容，增量补充
if 不存在:
    → 新建模式：创建新文档
```

### 2. 确定文档结构

```
if 知识量少:
    → 单文件：src/content/docs/{category}/{slug}.md

elif 知识量多:
    → 目录结构：
      src/content/docs/{category}/{slug}/
      ├── index.md        # 概览 + 导航
      ├── {block1}.md     # 知识块1
      └── {block2}.md     # 知识块2
```

### 3. 生成文档内容

```
按知识块组织，每个知识块包含：
- 框架（一句话定义、核心概念）
- 必要细节（决策点、常见坑）
- 图表（脑图/流程图/表格）
- 类比连接
```

### 4. 写入元信息

```yaml
---
title: 主题名称
description: 一句话描述
type: tools|domains|methods
learned_at: 2024-01-15
source_version: "18.x"    # 可选
freshness: stable|evolving|deprecated
related:
  - topic: 相关主题1
    relation: 类比/前置/后续
---
```

---

## 文档模板

### 工具类

```markdown
## 一句话定义

{一句话说明这个工具是什么、解决什么问题}

## 核心概念

| 概念 | 说明 | 类比 |
|------|------|------|
| 概念1 | 说明1 | 类比1 |

## 快速上手

```bash
# 最常用的命令
command here
```

## 决策点

| 场景 | 选择 | 理由 |
|------|------|------|
| 场景1 | 选择A | 理由A |

## 常见坑

1. **坑1**：描述 + 解决方案
```

### 领域类

```markdown
## 一句话定义

{一句话说明这个领域是什么}

## 技术版图

```mermaid
mindmap
  root((领域))
    分支1
```

## 核心概念

### 概念1

{说明}

## 选型依据

| 考虑因素 | 选择A | 选择B |
|---------|-------|-------|
| 因素1 | 适合 | 不适合 |
```

### 方法论类

```markdown
## 一句话定义

{一句话说明这个方法是什么}

## 核心步骤

1. **步骤1**：说明
2. **步骤2**：说明

## 适用场景

✅ 适合：场景1、场景2
❌ 不适合：场景3

## 典型误区

1. **误区1**：说明 + 正确做法
```

---

## 更新模式

```
1. 读取现有文档内容
2. 识别已有章节
3. 只补充新内容：
   - 新的决策点
   - 新的踩坑记录
   - 新的类比关系
4. 保留用户自定义修改
5. 更新元信息（learned_at、freshness）
```

---

## 图表生成规范

```
脑图：mindmap，用于概念体系
流程图：flowchart LR，用于步骤流程
表格：对比速查
```

---

## Starlight 文档规范

```
- 内部链接：绝对路径 /tools/nifi/core-concepts/
- 文件名：小写 + 连字符
- 多文件目录必须有 index.md
- 代码块必须指定语言
- mermaid 图表不使用 fill/style 等样式
- 标题层级：frontmatter 的 title 已渲染为 H1，内容必须从 ## 开始，禁止使用 # 一级标题
```

---

## 约束

- 按知识块组织
- 图文结合
- 记录元信息
- 更新时保留用户自定义内容
- 静默执行
- 内部链接使用绝对路径
- 文件名使用小写 + 连字符
