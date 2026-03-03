---
title: Python 开发环境
description: 为 JS 开发者准备的 Python 环境配置指南
---

# Python 开发环境配置

> **给前端开发者的类比**：Python 虚拟环境 ≈ Node.js 的 node_modules，pip ≈ npm

## 概览（5分钟）

### 一句话定义
Python 虚拟环境是项目级别的独立依赖空间，避免不同项目的包版本冲突。

### 核心问题
- **为什么需要虚拟环境？** 不同项目依赖不同版本的包（类似前端不同项目用不同版本的 React）
- **pip 是什么？** Python 的包管理器（等同于 npm）
- **venv vs virtualenv？** venv 是 Python 3.3+ 内置的，virtualenv 是第三方工具

### 适用场景
- 开发任何 Python 项目（脚本、Web 应用、数据分析等）
- 学习第三方库而不污染全局环境
- 部署项目到服务器

### 前置知识
- 了解命令行基础操作
- 理解「全局安装 vs 项目安装」概念（npm -g 的经验可直接迁移）

---

## 详解（60分钟）

### 1. Python 安装

#### Windows
```bash
# 下载官网安装包
# https://www.python.org/downloads/

# 验证安装
python --version
pip --version
```

#### 与 Node.js 类比
| 概念 | Node.js | Python |
|------|---------|--------|
| 运行时 | Node.js | Python 解释器 |
| 包管理器 | npm / yarn | pip / poetry |
| 版本管理 | nvm | pyenv |
| 全局安装 | npm install -g | pip install（不推荐） |
| 项目安装 | npm install | pip install（在虚拟环境内） |

---

### 2. 虚拟环境管理

#### 创建虚拟环境
```bash
# 类似于 npm init 创建项目
python -m venv venv

# 目录结构（类似 node_modules）
my-project/
├── venv/              # 虚拟环境（类似 node_modules）
│   ├── Scripts/       # Windows
│   ├── bin/           # Linux/Mac
│   ├── Lib/
│   └── Include/
├── main.py
└── requirements.txt   # 类似 package.json
```

#### 激活虚拟环境
```bash
# Windows
.\venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

# 激活后命令行提示符变化
(venv) PS D:\my-project>
```

**重要类比**：
- 激活虚拟环境 ≈ 进入项目目录后执行 `npm install`，之后所有命令都使用项目依赖
- 不激活 = 使用全局 Python（类似不在项目目录执行 node 命令）

#### 退出虚拟环境
```bash
deactivate
```

---

### 3. 包管理

#### 安装包
```bash
# 类似 npm install axios
pip install requests

# 安装特定版本（类似 npm install react@17）
pip install requests==2.28.0

# 从 requirements.txt 安装（类似 npm install）
pip install -r requirements.txt
```

#### 查看已安装的包
```bash
# 类似 npm list
pip list

# 导出依赖列表（类似 package.json）
pip freeze > requirements.txt
```

#### 卸载包
```bash
# 类似 npm uninstall
pip uninstall requests
```

---

### 4. requirements.txt 管理

#### 对比 package.json

**package.json**：
```json
{
  "dependencies": {
    "axios": "^1.0.0",
    "lodash": "~4.17.21"
  }
}
```

**requirements.txt**：
```txt
requests==2.28.0
pandas>=1.5.0
numpy<2.0.0
```

#### 版本号语法
| 写法 | 含义 | npm 等价 |
|------|------|----------|
| `requests==2.28.0` | 精确版本 | `"axios": "2.28.0"` |
| `requests>=2.28.0` | 最低版本 | `"axios": ">=2.28.0"` |
| `requests~=2.28.0` | 兼容版本 | `"axios": "~2.28.0"` |

---

### 5. 常见工程结构

#### 最小脚本项目
```
my-script/
├── venv/              # 虚拟环境（.gitignore）
├── main.py            # 入口文件
├── requirements.txt   # 依赖声明
└── README.md
```

#### 标准 Python 项目
```
my-project/
├── venv/              # 虚拟环境
├── src/               # 源代码（类似 src/）
│   ├── __init__.py
│   ├── main.py
│   └── utils.py
├── tests/             # 测试文件
├── requirements.txt
├── .gitignore
└── README.md
```

#### .gitignore 配置
```gitignore
# Python
venv/
__pycache__/
*.pyc
*.pyo
.env

# 类似 node_modules/
```

---

### 6. 进阶工具

#### Poetry（现代包管理器）
```bash
# 类似 yarn，更现代的 Python 包管理工具
poetry init
poetry add requests
poetry install
```

**Poetry vs pip**：
| 特性 | pip + venv | Poetry |
|------|------------|--------|
| 依赖文件 | requirements.txt | pyproject.toml |
| 锁定文件 | ❌ | poetry.lock（类似 package-lock.json） |
| 虚拟环境管理 | 手动 | 自动管理 |
| 发布到 PyPI | 手动 | 内置支持 |

#### pyenv（Python 版本管理）
```bash
# 类似 nvm 管理多个 Node.js 版本
pyenv install 3.11.0
pyenv global 3.11.0
pyenv local 3.9.0  # 项目级别指定版本
```

---

## 实战（25分钟）

### 初级：创建第一个 Python 脚本项目

**目标**：创建虚拟环境，安装包，运行脚本

```bash
# 1. 创建项目目录
mkdir hello-python
cd hello-python

# 2. 创建虚拟环境
python -m venv venv

# 3. 激活虚拟环境
.\venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux

# 4. 安装依赖
pip install requests

# 5. 创建 main.py
```

**main.py**：
```python
import requests

response = requests.get('https://api.github.com')
print(f"状态码: {response.status_code}")
print(f"响应头: {response.headers['content-type']}")
```

```bash
# 6. 运行脚本
python main.py

# 7. 导出依赖
pip freeze > requirements.txt

# 8. 退出虚拟环境
deactivate
```

---

### 中级：模拟团队协作流程

**场景**：克隆项目后如何启动

```bash
# 1. 克隆项目（假设）
git clone <repo-url>
cd project-name

# 2. 创建虚拟环境
python -m venv venv

# 3. 激活环境
.\venv\Scripts\activate

# 4. 安装依赖（类似 npm install）
pip install -r requirements.txt

# 5. 运行项目
python main.py
```

**添加新依赖的流程**：
```bash
# 1. 确保虚拟环境已激活
pip install pandas

# 2. 更新 requirements.txt
pip freeze > requirements.txt

# 3. 提交到 Git
git add requirements.txt
git commit -m "feat: 添加 pandas 依赖"
```

---

### 高级：多项目环境隔离

**场景**：同时维护使用不同 Python 版本的项目

```bash
# 项目 A（Python 3.9 + Django 3.2）
cd project-a
python3.9 -m venv venv
.\venv\Scripts\activate
pip install django==3.2

# 项目 B（Python 3.11 + Django 4.2）
cd ../project-b
python3.11 -m venv venv
.\venv\Scripts\activate
pip install django==4.2
```

**使用 pyenv 管理**：
```bash
# 为不同项目指定 Python 版本
cd project-a
pyenv local 3.9.0

cd project-b
pyenv local 3.11.0

# 每个项目自动使用对应版本
```

---

## 常见问题

### Q1: 为什么 pip install 很慢？
```bash
# 使用国内镜像（类似 npm 淘宝镜像）
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple requests

# 永久配置
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

### Q2: venv 目录很大，需要提交到 Git 吗？
❌ **不需要**，类似 `node_modules`，应该加入 `.gitignore`

### Q3: 如何在 VS Code 中使用虚拟环境？
1. `Ctrl+Shift+P` 打开命令面板
2. 输入 `Python: Select Interpreter`
3. 选择 `.\venv\Scripts\python.exe`

### Q4: 虚拟环境损坏了怎么办？
```bash
# 直接删除重建（类似删除 node_modules）
rm -rf venv
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

---

## 延伸阅读

- [Python 编程语言](/domains/python/) - Python 语法基础
- [从 JS 到 Python 学习路径](/methods/js-to-python/) - 系统学习规划
- [pip 官方文档](https://pip.pypa.io/)
- [venv 官方文档](https://docs.python.org/3/library/venv.html)

---

## 快速命令参考

```bash
# 环境管理
python -m venv venv        # 创建虚拟环境
.\venv\Scripts\activate    # 激活（Windows）
deactivate                 # 退出

# 包管理
pip install <package>      # 安装包
pip uninstall <package>    # 卸载包
pip list                   # 查看已安装
pip freeze > requirements.txt  # 导出依赖
pip install -r requirements.txt  # 安装依赖

# 查看信息
python --version           # Python 版本
pip --version              # pip 版本
which python               # 当前使用的 Python 路径
```
