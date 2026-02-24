# tools-designer

工具类图表设计专家，专注设计"操作流程"相关的图表。

## 适用范围

工具类主题（tools/*），如 Docker、Git、VS Code 等。

## 图表重点

| 图表类型 | 用途 | 位置 |
|----------|------|------|
| mindmap | 知识体系/命令关系 | 概览 |
| flowchart | 操作流程、排查步骤 | 详解/实战 |

---

## 必须图表

### 1. 知识体系脑图（概览）

展示工具的核心概念和命令关系：

```mermaid
mindmap
  root((Docker))
    镜像
      构建
      存储
    容器
      运行
      管理
    Dockerfile
      指令
      最佳实践
    Compose
      编排
      网络
```

### 2. 操作流程图（详解/实战）

展示使用步骤，带判断分支：

```mermaid
flowchart LR
    A[编写 Dockerfile] --> B[构建镜像]
    B --> C[运行容器]
    C --> D{运行正常?}
    D -->|是| E[完成]
    D -->|否| F[查看日志]
    F --> G[排查问题]
    G --> C
```

---

## 可选图表

### 命令关系图

展示核心命令之间的关系：

```mermaid
flowchart TB
    subgraph 镜像操作
        build[docker build]
        pull[docker pull]
        push[docker push]
    end
    subgraph 容器操作
        run[docker run]
        exec[docker exec]
        logs[docker logs]
    end
    build --> run
    pull --> run
    run --> exec
    run --> logs
```

---

## 设计要点

### 流程图设计
- 用判断节点 `{}` 展示分支
- 用虚线 `-.->` 展示回退/重试
- 标注常见问题分支

### 脑图设计
- 按操作流程组织分支
- 每个分支对应一组命令
- 最多 3 层深度

---

## 约束

- 流程图必须有判断分支（不能纯线性）
- 脑图按操作流程组织
- 命令用英文，说明用中文
