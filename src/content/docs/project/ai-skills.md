---
title: AI Skill 规格
description: StudyBuddy AI Skill 分层架构设计，主Skill调度 + 子Skill专业化处理
sidebar:
  order: 4
---

> 版本：v3.0 | 更新日期：2026-02-24

## 架构概览：分层调度

采用「**主 Skill 调度 + 子 Skill 专业化**」的分层架构：

```
learning-master (总调度)
    │
    ├── topic-analyzer (主入口)
    │       ├── tools-analyzer    # 工具类分析
    │       ├── domains-analyzer  # 领域类分析
    │       └── methods-analyzer  # 方法论类分析
    │
    ├── outline-planner (主入口)
    │       ├── tools-planner     # 工具类大纲
    │       ├── domains-planner   # 领域类大纲
    │       └── methods-planner   # 方法论类大纲
    │
    ├── content-writer (主入口)
    │       ├── tools-writer      # 工具类写作
    │       ├── domains-writer    # 领域类写作
    │       └── methods-writer    # 方法论类写作
    │
    ├── visual-designer (主入口)
    │       ├── tools-designer    # 工具类图表
    │       ├── domains-designer  # 领域类图表
    │       └── methods-designer  # 方法论类图表
    │
    └── quality-checker (主入口)
            ├── tools-checker     # 工具类检查
            ├── domains-checker   # 领域类检查
            └── methods-checker   # 方法论类检查
```

---

## 设计理念

### 为什么拆分？

| 问题 | 解决方案 |
|------|----------|
| 不同类型差异太大 | 每种类型有专属处理逻辑 |
| 主 SKILL 太臃肿 | 主入口只负责调度 |
| 维护困难 | 改某类型只需改对应文件 |

### 职责划分

**主 Skill**：
- 接收输入
- 判断类型
- 调用对应子 Skill
- 输出统一格式

**子 Skill**：
- 执行该类型的具体处理逻辑
- 不需要判断类型，专注业务
- 输出格式与主 Skill 定义一致

---

## 三种类型

| 类型 | 定位 | 学习目标 | 文档重点 |
|------|------|----------|----------|
| **tools（工具类）** | 具体工具/平台 | 会用、能操作 | 命令、配置、常见坑 |
| **domains（领域类）** | 技术领域/问题域 | 懂全局、能决策 | 概念、关系、选型依据 |
| **methods（方法论）** | 学习方法/思维框架 | 会思考、能迁移 | 步骤、场景、误区 |

### 类型判断

1. 是否围绕一个工具/产品的使用与配置？→ **tools**
2. 是否讨论某个技术领域的整体知识？→ **domains**
3. 是否讲"如何学习/如何思考/如何解决问题"？→ **methods**

---

## 各阶段差异化处理

### topic-analyzer：差异化分析

| 类型 | type_specific 输出 |
|------|-------------------|
| tools | core_commands、common_pitfalls、config_highlights |
| domains | tech_stack_relations、decision_factors、trends |
| methods | steps、applicable_scenarios、not_applicable、common_mistakes |

### outline-planner：差异化大纲

| 类型 | 详解结构 | 实战形式 |
|------|----------|----------|
| tools | 是什么/为什么/怎么用（命令） | 手把手操作 |
| domains | 是什么/对比/选型依据 | 案例分析 |
| methods | 是什么/步骤/误区 | 场景应用 |

### content-writer：差异化写作

| 类型 | 写作重点 |
|------|----------|
| tools | 命令可运行、参数合理、常见坑覆盖 |
| domains | 选型依据充分、技术关系清晰、决策过程完整 |
| methods | 步骤清晰、场景明确、误区覆盖 |

### visual-designer：差异化图表

| 类型 | 核心图表 | 图表重点 |
|------|----------|----------|
| tools | mindmap + flowchart | 操作流程、命令关系 |
| domains | mindmap + flowchart | 技术栈关系、决策流程 |
| methods | flowchart + mindmap | 方法步骤、应用场景 |

### quality-checker：差异化检查

| 类型 | 重点检查项 |
|------|------------|
| tools | 命令可运行、常见坑覆盖 |
| domains | 选型依据充分、技术关系清晰 |
| methods | 步骤清晰、场景明确、误区覆盖 |

---

## 上下文传递

整个流水线的数据流：

```
topic-analyzer 输出（JSON）
    ↓ 完整传递
outline-planner ← analysis
    ↓ 完整传递
content-writer ← analysis + outline
visual-designer ← analysis + outline
    ↓ 完整传递
quality-checker ← analysis + full_content
```

**关键规则**：
- analysis 是后续所有 Skill 的唯一来源
- 不允许"另起炉灶"重新生成已定义的内容

---

## 文件结构

```
.qoder/skills/
├── learning-master/
│   └── SKILL.md                    # 总调度
├── topic-analyzer/
│   ├── SKILL.md                    # 主入口
│   ├── tools-analyzer.md           # 工具类分析
│   ├── domains-analyzer.md         # 领域类分析
│   └── methods-analyzer.md         # 方法论类分析
├── outline-planner/
│   ├── SKILL.md
│   ├── tools-planner.md
│   ├── domains-planner.md
│   └── methods-planner.md
├── content-writer/
│   ├── SKILL.md
│   ├── tools-writer.md
│   ├── domains-writer.md
│   └── methods-writer.md
├── visual-designer/
│   ├── SKILL.md
│   ├── tools-designer.md
│   ├── domains-designer.md
│   └── methods-designer.md
└── quality-checker/
    ├── SKILL.md
    ├── tools-checker.md
    ├── domains-checker.md
    └── methods-checker.md
```

---

## 使用方式

```bash
/learning-master Docker
```

系统自动：
1. 判断 Docker 属于 tools/efficiency
2. 调用 tools-analyzer 分析
3. 调用 tools-planner 生成大纲
4. 调用 tools-writer 撰写内容
5. 调用 tools-designer 生成图表
6. 调用 tools-checker 检查质量
7. 输出文档

---

## 优势总结

| 维度 | 改进前 | 改进后 |
|------|--------|--------|
| 架构 | 单文件混合逻辑 | 分层架构，职责清晰 |
| 维护 | 改一处影响全局 | 改某类型只改对应文件 |
| 扩展 | 新增类型要改多处 | 只需添加新子 Skill |
| 清晰度 | 规则混在一起 | 每种类型独立规范 |
