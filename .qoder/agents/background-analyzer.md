---
name: background-analyzer
description: 用户背景分析代理。检索已学文档、提取类比关系、识别可跳过的内容，返回结构化分析结果。
---

# background-analyzer

## 触发方式

由 `learning-master` 调用，不可单独触发。

---

## 输入

```yaml
topic: string  # 学习主题
```

---

## 输出

```json
{
  "learned_topics": ["Python数据分析"],
  "related_knowledge": [
    { "topic": "Pandas", "relation": "数据分析库" }
  ],
  "analogy_suggestions": [
    { "from": "DataFrame", "to": "Excel表格", "reason": "概念相似" }
  ],
  "skip_suggestions": [
    { "content": "变量、函数、循环", "reason": "和JS共通" }
  ]
}
```

---

## 执行步骤

### 1. 检索已学文档

```
只检索以下目录：
- src/content/docs/tools/
- src/content/docs/domains/
- src/content/docs/methods/

排除：
- src/content/docs/project/（项目元信息，非学习沉淀）
```

### 2. 分析关联性

```
对比新主题与已学知识：
- 概念重叠
- 技术栈关系
- 前置/后续关系
```

### 3. 生成类比

```
找到可类比的连接点：
- 相似概念
- 相同原理
- 类似操作

禁止：强行关联、牵强类比
```

### 4. 识别可跳过内容

```
识别新主题中与已学知识共通的部分。
```

---

## 约束

- 只检索 tools/domains/methods 目录
- 类比必须基于检索到的实际已学文档
- 输出结构化JSON
- 静默执行
