---
title: 常用内置功能
description: 文件操作、JSON 处理、日期时间、HTTP 请求等实用功能
---

# 常用内置功能

> **给 JS 开发者**：Python 标准库功能丰富，很多场景无需安装第三方包

---

## 1. 文件操作

### 读取文件
```python
# 基础读取
with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()  # 读取全部内容

# 按行读取
with open("data.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()  # 返回列表，每行一个元素
    for line in lines:
        print(line.strip())  # 去除换行符

# 逐行迭代（推荐，节省内存）
with open("data.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line.strip())
```

**重要**：`with` 语句自动关闭文件（类似 try-finally）

---

### 写入文件
```python
# 覆盖写入
with open("output.txt", "w", encoding="utf-8") as f:
    f.write("Hello World\n")
    f.write("Line 2\n")

# 追加写入
with open("output.txt", "a", encoding="utf-8") as f:
    f.write("Appended line\n")

# 写入多行
lines = ["Line 1\n", "Line 2\n", "Line 3\n"]
with open("output.txt", "w", encoding="utf-8") as f:
    f.writelines(lines)
```

---

### 文件模式
| 模式 | 含义 | 文件不存在 |
|------|------|------------|
| `"r"` | 只读 | 报错 |
| `"w"` | 覆盖写 | 创建 |
| `"a"` | 追加写 | 创建 |
| `"r+"` | 读写 | 报错 |
| `"w+"` | 读写（覆盖） | 创建 |
| `"rb"` | 二进制读 | 报错 |
| `"wb"` | 二进制写 | 创建 |

---

### 路径操作（pathlib）
```python
from pathlib import Path

# 创建路径对象
p = Path("data/file.txt")

# 检查
p.exists()            # 文件是否存在
p.is_file()           # 是否是文件
p.is_dir()            # 是否是目录

# 获取信息
p.name                # "file.txt"（文件名）
p.stem                # "file"（无扩展名）
p.suffix              # ".txt"（扩展名）
p.parent              # Path("data")（父目录）
p.absolute()          # 绝对路径

# 创建目录
Path("new_dir").mkdir(exist_ok=True)

# 遍历目录
for file in Path(".").glob("*.py"):
    print(file)

# 读写文件（简化写法）
p.read_text(encoding="utf-8")        # 读取
p.write_text("content", encoding="utf-8")  # 写入
```

**对比 JS**：
```javascript
// Node.js
const fs = require('fs');
const path = require('path');

fs.readFileSync('data.txt', 'utf-8');
path.basename('data/file.txt');  // "file.txt"
```

---

## 2. JSON 处理

### 读取 JSON
```python
import json

# 从字符串解析
json_str = '{"name": "Alice", "age": 25}'
data = json.loads(json_str)
print(data["name"])  # "Alice"

# 从文件读取
with open("data.json", "r", encoding="utf-8") as f:
    data = json.load(f)
```

---

### 写入 JSON
```python
data = {"name": "Alice", "age": 25, "skills": ["Python", "JS"]}

# 转换为字符串
json_str = json.dumps(data, ensure_ascii=False, indent=2)
print(json_str)

# 写入文件
with open("output.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
```

**参数说明**：
- `ensure_ascii=False`：允许中文字符
- `indent=2`：格式化输出（2 空格缩进）

---

### 对比 JS
```python
# JavaScript
JSON.parse('{"name": "Alice"}')
JSON.stringify({name: "Alice"})

# Python
json.loads('{"name": "Alice"}')
json.dumps({"name": "Alice"})
```

---

## 3. 日期与时间

### datetime 模块
```python
from datetime import datetime, timedelta

# 获取当前时间
now = datetime.now()
print(now)  # 2026-03-01 14:30:00.123456

# 格式化输出
now.strftime("%Y-%m-%d")          # "2026-03-01"
now.strftime("%Y-%m-%d %H:%M:%S") # "2026-03-01 14:30:00"
now.strftime("%Y年%m月%d日")       # "2026年03月01日"

# 解析字符串
dt = datetime.strptime("2026-03-01", "%Y-%m-%d")

# 时间运算
tomorrow = now + timedelta(days=1)
next_week = now + timedelta(weeks=1)
one_hour_ago = now - timedelta(hours=1)
```

---

### 常用格式化符号
| 符号 | 含义 | 示例 |
|------|------|------|
| `%Y` | 四位年份 | 2026 |
| `%m` | 月份（01-12） | 03 |
| `%d` | 日期（01-31） | 01 |
| `%H` | 小时（00-23） | 14 |
| `%M` | 分钟（00-59） | 30 |
| `%S` | 秒（00-59） | 00 |
| `%A` | 星期全名 | Sunday |
| `%B` | 月份全名 | March |

---

### 时间戳
```python
import time

# 获取当前时间戳
timestamp = time.time()  # 1709294400.123

# 时间戳 → datetime
dt = datetime.fromtimestamp(timestamp)

# datetime → 时间戳
timestamp = dt.timestamp()

# 暂停执行
time.sleep(2)  # 暂停 2 秒
```

---

### 对比 JS
```python
# JavaScript
new Date()
Date.now()
new Date().toISOString()

# Python
datetime.now()
time.time()
datetime.now().isoformat()
```

---

## 4. HTTP 请求（requests）

### 安装
```bash
pip install requests
```

---

### GET 请求
```python
import requests

# 基础请求
response = requests.get("https://api.github.com")
print(response.status_code)  # 200
print(response.text)         # 响应内容（字符串）
print(response.json())       # 解析为 JSON

# 带参数
params = {"q": "python", "sort": "stars"}
response = requests.get("https://api.github.com/search/repositories", params=params)

# 带请求头
headers = {"Authorization": "Bearer token123"}
response = requests.get("https://api.example.com", headers=headers)
```

---

### POST 请求
```python
# JSON 数据
data = {"name": "Alice", "age": 25}
response = requests.post("https://api.example.com/users", json=data)

# 表单数据
data = {"username": "alice", "password": "pass123"}
response = requests.post("https://api.example.com/login", data=data)

# 文件上传
files = {"file": open("data.txt", "rb")}
response = requests.post("https://api.example.com/upload", files=files)
```

---

### 异常处理
```python
try:
    response = requests.get("https://api.example.com", timeout=5)
    response.raise_for_status()  # 4xx/5xx 抛出异常
    data = response.json()
except requests.exceptions.Timeout:
    print("请求超时")
except requests.exceptions.HTTPError as e:
    print(f"HTTP 错误: {e}")
except requests.exceptions.RequestException as e:
    print(f"请求失败: {e}")
```

---

### 对比 JS
```javascript
// JavaScript (fetch)
const response = await fetch('https://api.github.com');
const data = await response.json();

// Python (requests)
response = requests.get('https://api.github.com')
data = response.json()
```

---

## 5. 命令行参数

### sys.argv（基础）
```python
import sys

# python script.py arg1 arg2
print(sys.argv)  # ['script.py', 'arg1', 'arg2']

if len(sys.argv) > 1:
    filename = sys.argv[1]
    print(f"处理文件: {filename}")
```

---

### argparse（推荐）
```python
import argparse

parser = argparse.ArgumentParser(description="文件处理工具")
parser.add_argument("file", help="输入文件路径")
parser.add_argument("-o", "--output", help="输出文件路径", default="output.txt")
parser.add_argument("-v", "--verbose", action="store_true", help="详细输出")

args = parser.parse_args()

print(f"输入文件: {args.file}")
print(f"输出文件: {args.output}")
if args.verbose:
    print("启用详细输出")
```

**使用示例**：
```bash
python script.py input.txt -o result.txt -v
python script.py --help  # 自动生成帮助信息
```

---

## 6. 正则表达式

```python
import re

# 查找匹配
text = "联系方式: 13812345678, 13987654321"
phones = re.findall(r"1[3-9]\d{9}", text)
# ['13812345678', '13987654321']

# 替换
text = "price: $100"
result = re.sub(r"\$(\d+)", r"¥\1", text)  # "price: ¥100"

# 分割
text = "apple,banana;orange"
fruits = re.split(r"[,;]", text)  # ['apple', 'banana', 'orange']

# 匹配检查
if re.match(r"^\d{4}-\d{2}-\d{2}$", "2026-03-01"):
    print("日期格式正确")

# 搜索（返回匹配对象）
match = re.search(r"(\d+)-(\d+)-(\d+)", "2026-03-01")
if match:
    year, month, day = match.groups()
```

---

## 7. 实用工具

### os 模块（系统操作）
```python
import os

# 环境变量
api_key = os.getenv("API_KEY", "default_key")

# 路径操作
os.path.exists("file.txt")      # 检查文件存在
os.path.join("dir", "file.txt") # 拼接路径
os.path.basename("/path/to/file.txt")  # "file.txt"
os.path.dirname("/path/to/file.txt")   # "/path/to"

# 执行命令
os.system("ls -l")  # 执行 shell 命令
```

---

### subprocess（推荐）
```python
import subprocess

# 执行命令
result = subprocess.run(["ls", "-l"], capture_output=True, text=True)
print(result.stdout)
print(result.returncode)  # 返回码

# 执行 shell 命令
result = subprocess.run("git status", shell=True, capture_output=True, text=True)
```

---

### random（随机数）
```python
import random

random.randint(1, 10)         # 1-10 随机整数
random.random()               # 0-1 随机浮点数
random.choice([1, 2, 3])      # 随机选择一个元素
random.shuffle([1, 2, 3])     # 打乱列表（原地修改）
random.sample([1, 2, 3], 2)   # 随机取 2 个元素（不重复）
```

---

### collections（数据结构）
```python
from collections import Counter, defaultdict, deque

# Counter（计数器）
counter = Counter(["a", "b", "a", "c", "b", "a"])
counter.most_common(2)  # [('a', 3), ('b', 2)]

# defaultdict（默认值字典）
d = defaultdict(int)
d["key"] += 1  # 无需检查键是否存在

# deque（双端队列）
q = deque([1, 2, 3])
q.append(4)       # 右侧添加
q.appendleft(0)   # 左侧添加
q.pop()           # 右侧删除
q.popleft()       # 左侧删除
```

---

## 8. 实战示例

### 示例 1：批量处理 JSON 文件
```python
import json
from pathlib import Path

def process_json_files(input_dir, output_dir):
    input_path = Path(input_dir)
    output_path = Path(output_dir)
    output_path.mkdir(exist_ok=True)
    
    for json_file in input_path.glob("*.json"):
        # 读取 JSON
        data = json.loads(json_file.read_text(encoding="utf-8"))
        
        # 处理数据（示例：提取特定字段）
        processed = {
            "id": data.get("id"),
            "name": data.get("name"),
            "created_at": datetime.now().isoformat()
        }
        
        # 写入新文件
        output_file = output_path / f"processed_{json_file.name}"
        output_file.write_text(
            json.dumps(processed, ensure_ascii=False, indent=2),
            encoding="utf-8"
        )
        print(f"处理完成: {json_file.name}")

process_json_files("data/input", "data/output")
```

---

### 示例 2：简单的 Web 爬虫
```python
import requests
from bs4 import BeautifulSoup

def scrape_github_trending():
    url = "https://github.com/trending"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    
    repos = []
    for article in soup.find_all("article", class_="Box-row"):
        title_elem = article.find("h2")
        if title_elem:
            repo_name = title_elem.text.strip()
            repos.append(repo_name)
    
    return repos

trending = scrape_github_trending()
print("\n".join(trending))
```

---

### 示例 3：文件批量重命名
```python
from pathlib import Path
import re

def rename_files(directory, pattern, replacement):
    """批量重命名文件"""
    path = Path(directory)
    count = 0
    
    for file in path.glob("*"):
        if file.is_file():
            new_name = re.sub(pattern, replacement, file.name)
            if new_name != file.name:
                new_path = file.parent / new_name
                file.rename(new_path)
                print(f"{file.name} → {new_name}")
                count += 1
    
    print(f"\n共重命名 {count} 个文件")

# 使用示例
rename_files("./photos", r"IMG_(\d+)", r"photo_\1")
# IMG_001.jpg → photo_001.jpg
```

---

## 快速参考

```python
# 文件
with open("file.txt", "r", encoding="utf-8") as f:
    content = f.read()

# JSON
import json
data = json.loads(json_str)
json.dumps(data, ensure_ascii=False, indent=2)

# 日期
from datetime import datetime
datetime.now().strftime("%Y-%m-%d")

# HTTP
import requests
response = requests.get(url)
data = response.json()

# 路径
from pathlib import Path
p = Path("file.txt")
p.exists(), p.read_text()
```

---

## 延伸阅读

- [实战案例](/domains/python/examples/) - 完整脚本示例
- [数据结构](/domains/python/data-structures/) - 列表、字典、集合
- [Python 编程语言](/domains/python/) - 返回主目录

---

## 推荐第三方库

| 库 | 用途 | 安装 |
|----|------|------|
| **requests** | HTTP 请求 | `pip install requests` |
| **beautifulsoup4** | HTML 解析 | `pip install beautifulsoup4` |
| **pandas** | 数据分析 | `pip install pandas` |
| **openpyxl** | Excel 操作 | `pip install openpyxl` |
| **pillow** | 图片处理 | `pip install pillow` |
| **python-dotenv** | 环境变量 | `pip install python-dotenv` |
