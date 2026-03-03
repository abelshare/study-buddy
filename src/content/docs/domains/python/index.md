---
title: Python 编程语言
description: 为 JavaScript 开发者准备的 Python 快速入门指南
---

# Python 编程语言

> **给 JS 开发者的一句话**：Python 是更简洁、更易读的「可执行伪代码」，适合快速实现逻辑

## 概览（5分钟）

### 一句话定义
Python 是一门强调可读性和简洁性的动态类型语言，擅长脚本编写、数据处理和快速原型开发。

### 核心问题
- **为什么学 Python？** 写脚本比 JS 方便（无需 Node.js 环境），生态丰富（数据分析、AI、运维）
- **和 JS 最大的区别？** 缩进定义代码块（不用花括号），同步代码更直观（无回调地狱）
- **学习成本多高？** 有 JS 基础，语法迁移 1-2 天，熟练使用约 1 周

### 适用场景
- ✅ 命令行工具/自动化脚本
- ✅ 数据处理/分析
- ✅ 快速原型验证
- ❌ 前端开发（仍用 JS/TS）
- ❌ 高性能计算（考虑 Go/Rust）

### 前置知识
- JavaScript 基础语法（变量、函数、循环、条件）
- 命令行基础操作

---

## 核心概念速查

| 概念 | JavaScript | Python |
|------|------------|--------|
| 代码块 | `{ }` | 缩进（4空格/1Tab） |
| 变量声明 | `let/const` | 直接赋值 |
| 函数定义 | `function` 或 `=>` | `def` |
| 真值判断 | `true/false` | `True/False`（首字母大写） |
| 空值 | `null/undefined` | `None` |
| 字符串插值 | `` `${name}` `` | `f"{name}"` |
| 数组 | `[]` | `[]`（称为列表） |
| 对象 | `{}` | `{}`（称为字典） |
| 类型检查 | `typeof` | `type()` |

---

## 学习路径

本主题分为以下部分：

1. **[基础语法对照](/domains/python/syntax/)** - 变量、函数、控制流（与 JS 对照学习）
2. **[数据结构](/domains/python/data-structures/)** - 列表、字典、元组、集合
3. **[常用内置功能](/domains/python/built-in/)** - 文件操作、字符串处理、日期时间
4. **[实战案例](/domains/python/examples/)** - 3 个真实脚本示例

---

## 快速预览

### Hello World
```python
# JavaScript
console.log("Hello World");

# Python
print("Hello World")
```

### 变量与类型
```python
# JavaScript
let name = "Alice";
const age = 25;
let isActive = true;

# Python
name = "Alice"
age = 25
is_active = True  # 注意：True 首字母大写
```

### 函数定义
```python
# JavaScript
function greet(name) {
  return `Hello, ${name}!`;
}

# Python
def greet(name):
    return f"Hello, {name}!"  # f-string 语法
```

### 条件判断
```python
# JavaScript
if (age >= 18) {
  console.log("成年");
} else {
  console.log("未成年");
}

# Python
if age >= 18:
    print("成年")
else:
    print("未成年")
```

### 循环
```python
# JavaScript
for (let i = 0; i < 5; i++) {
  console.log(i);
}

# Python
for i in range(5):  # range(5) 生成 0-4
    print(i)
```

---

## 与 JS 的关键差异

### 1. 缩进强制要求
```python
# ❌ 错误：缩进不一致
def test():
print("hello")  # IndentationError

# ✅ 正确：使用 4 空格缩进
def test():
    print("hello")
```

**建议**：配置编辑器「Tab = 4 空格」

---

### 2. 没有分号
```python
# JavaScript 需要分号（可选）
let x = 1;
let y = 2;

# Python 不需要分号
x = 1
y = 2
```

---

### 3. 布尔值首字母大写
```python
# JavaScript
let isActive = true;
let isDeleted = false;

# Python
is_active = True   # 注意大写
is_deleted = False
```

---

### 4. 命名风格差异
```python
# JavaScript（驼峰命名）
let firstName = "John";
function getUserInfo() {}

# Python（蛇形命名）
first_name = "John"
def get_user_info():
    pass
```

---

### 5. 字符串拼接
```python
# JavaScript
const name = "Alice";
const message = `Hello, ${name}!`;

# Python（推荐 f-string）
name = "Alice"
message = f"Hello, {name}!"  # Python 3.6+

# Python（旧写法）
message = "Hello, {}!".format(name)
message = "Hello, " + name + "!"
```

---

## 学习建议

### 第一阶段：语法迁移（1-2天）
**目标**：能看懂 Python 代码，写简单脚本

- ✅ 阅读 [基础语法对照](/domains/python/syntax/)
- ✅ 完成 10 个小练习（变量、函数、循环）
- ✅ 写一个「文件批量重命名」脚本

---

### 第二阶段：脚本能力（3-5天）
**目标**：独立编写实用脚本

- ✅ 学习 [数据结构](/domains/python/data-structures/)（列表、字典）
- ✅ 学习 [常用内置功能](/domains/python/built-in/)（文件、JSON、日期）
- ✅ 写 3 个真实脚本：
  - 批量处理 JSON 文件
  - 爬取网页内容（requests + BeautifulSoup）
  - 自动化发送邮件

---

### 第三阶段：进阶实战（选学）
**目标**：根据需求选择方向

- 数据分析：学习 pandas、numpy
- Web 开发：学习 Flask/Django
- 自动化运维：学习 os、subprocess、paramiko

---

## 工具推荐

### VS Code 插件
- **Python** (Microsoft) - 语法高亮、调试、Linting
- **Pylance** - 代码补全、类型检查
- **Black Formatter** - 代码格式化（类似 Prettier）

### 调试方式
```python
# 类似 console.log
print(f"变量值: {variable}")

# 使用 VS Code 调试器
# 1. 打断点（点击行号左侧）
# 2. F5 启动调试
# 3. F10 单步执行
```

---

## 延伸阅读

- [Python 开发环境](/tools/python-env/) - 虚拟环境与包管理
- [从 JS 到 Python 学习路径](/methods/js-to-python/) - 完整学习规划
- [Python 官方教程](https://docs.python.org/zh-cn/3/tutorial/)

---

## 下一步

👉 [开始学习基础语法对照 →](/domains/python/syntax/)
