---
title: 基本使用
description: OpenClaw 的安装配置和基本使用方法
type: tools
---

## 基本使用

## 快速启动（5 分钟）

```bash
# 1. 安装
pip install openclaw
# 或
npm install -g openclaw

# 2. 初始化（创建 workspace 和默认文件）
openclaw init

# 3. 配置 LLM API Key
openclaw configure
# 或手动编辑
echo "ANTHROPIC_API_KEY=sk-ant-xxx" >> ~/.openclaw/.env

# 4. 连接消息平台
openclaw connect telegram --token YOUR_BOT_TOKEN

# 5. 启动
openclaw start
```

---

## 核心文件配置

### SOUL.md — 定义 Agent 人格

```markdown
# 你是谁

你是 OpenClaw，一个智能个人助理。

## 人格特质
- 简洁高效，不废话
- 主动思考，提前准备
- 尊重隐私，谨慎处理敏感信息

## 语调
- 专业但友好
- 使用中文回复
- 善用 emoji 增加亲和力 🎯

## 边界
- 不执行可能造成损害的操作
- 敏感操作需用户确认
- 不存储密码、密钥等敏感信息
```

**记忆口诀**：SOUL.md = Agent 的"灵魂"

---

### USER.md — 定义用户画像

```markdown
# 用户信息

## 基本信息
- 姓名：张三
- 职业：前端开发工程师
- 时区：Asia/Shanghai

## 工作背景
- 技术栈：React, TypeScript, Node.js
- 当前项目：Study Partner 文档系统
- 常用工具：GitHub, Slack, Notion

## 沟通偏好
- 风格：简洁直接
- 语言：中文
- 接收渠道：Telegram（个人）、Slack（工作）
```

**记忆口诀**：USER.md = Agent 对"你的认知"

---

### AGENTS.md — 定义行为规则

```markdown
# Agent 操作指令

## 优先级规则
1. 紧急事项立即通知
2. 工作时间（9-18点）才推送非紧急消息
3. 周末不推送工作相关通知

## 记忆管理
- 每次会话开始：读取今日 + 昨日的 memory 日志
- 重要决策：立即写入 MEMORY.md
- 会话结束：flush 到 memory/YYYY-MM-DD.md

## 工具使用
- 执行命令前：确认是否安全
- 发送邮件前：显示草稿让用户确认
- 文件修改：备份原文件
```

**记忆口诀**：AGENTS.md = Agent 的"行为准则"

---

## Skills 安装与使用

```bash
# 查看可用 Skills
openclaw skills list

# 搜索特定 Skill
openclaw skills search email

# 安装 Skill
openclaw skills install email-manager

# 从 GitHub 安装
openclaw skills install github:user/openclaw-skill-name

# 启用/禁用 Skill
openclaw skills enable email-manager
openclaw skills disable email-manager
```

---

## 交互方式

### 方式 1：消息平台（推荐日常使用）

```
Telegram 发送：/openclaw 帮我整理今天的邮件
```

### 方式 2：CLI 交互

```bash
openclaw ask "分析这个项目的代码结构"
```

### 方式 3：API 调用（集成到应用）

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"message": "生成日报", "session": "main"}'
```

---

## 记忆管理

### 手动操作

```bash
# 添加记忆
openclaw memory add "我的工作项目是 Study Partner"

# 查询记忆
openclaw memory search "项目"

# 查看今日记忆
openclaw memory show today

# 导出记忆
openclaw memory export backup.json
```

### 自然语言操作

```
# 添加记忆
"记住：我的工作邮箱是 xxx@company.com"

# 查询记忆
"你还记得我之前说的 XXX 项目吗？"

# 删除记忆
"忘掉关于 YYY 的信息"
```

---

## 常用命令速查表

| 命令 | 说明 |
|------|------|
| `openclaw start` | 前台启动 |
| `openclaw daemon start` | 后台守护进程 |
| `openclaw stop` | 停止 |
| `openclaw configure` | 交互式配置 |
| `openclaw connect telegram` | 连接消息平台 |
| `openclaw skills list` | 列出已安装 Skills |
| `openclaw skills install <name>` | 安装 Skill |
| `openclaw memory show today` | 查看今日记忆 |
| `openclaw doctor` | 健康检查 |
| `openclaw logs` | 查看日志 |
| `openclaw status` | 运行状态 |

---

## 文件位置速查

| 文件/目录 | 路径 | 用途 |
|----------|------|------|
| 主配置 | `~/.openclaw/openclaw.json` | 全局配置 |
| 凭证 | `~/.openclaw/credentials/` | API Key、OAuth |
| Workspace | `~/.openclaw/workspace/` | Agent 认知和工作空间 |
| Skills | `~/.openclaw/skills/` | 安装的能力包 |
| 会话 | `~/.openclaw/agents/<id>/sessions/` | 对话历史 |

---

**下一步**：了解 [工程化应用](engineering)
