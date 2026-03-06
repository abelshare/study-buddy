---
title: 数据结构
description: Python 核心数据结构：列表、字典、元组、集合
---

## 数据结构概览

> **给 JS 开发者**：Python 有更丰富的内置数据结构，选对工具事半功倍

---

## 概览

| 类型 | JS 等价 | 可变性 | 去重 | 有序 | 使用场景 |
|------|---------|--------|------|------|----------|
| **列表 list** | `Array` | ✅ 可变 | ❌ | ✅ | 通用数组操作 |
| **元组 tuple** | （无等价） | ❌ 不可变 | ❌ | ✅ | 常量数组、函数返回多值 |
| **字典 dict** | `Object` | ✅ 可变 | 键去重 | ✅ (3.7+) | 键值对存储 |
| **集合 set** | `Set` | ✅ 可变 | ✅ | ❌ | 去重、集合运算 |

---

## 1. 列表（List）

### 基础操作
```python
# 创建列表
arr = [1, 2, 3]
mixed = [1, "hello", True, [1, 2]]  # 支持混合类型

# 访问元素
arr[0]       # 1（正向索引）
arr[-1]      # 3（负向索引，最后一个）
arr[-2]      # 2（倒数第二个）

# 切片
arr[1:3]     # [2, 3]（索引 1-2）
arr[:2]      # [1, 2]（前 2 个）
arr[2:]      # [3]（从索引 2 到末尾）
arr[::2]     # [1, 3]（每隔一个）
arr[::-1]    # [3, 2, 1]（反转）
```

---

### 增删改查
```python
arr = [1, 2, 3]

# 增
arr.append(4)         # [1, 2, 3, 4]（末尾添加）
arr.insert(1, 99)     # [1, 99, 2, 3, 4]（插入到索引 1）
arr.extend([5, 6])    # [1, 99, 2, 3, 4, 5, 6]（合并列表）

# 删
arr.pop()             # 删除末尾，返回 6
arr.pop(1)            # 删除索引 1，返回 99
arr.remove(3)         # 删除值为 3 的第一个元素
del arr[0]            # 删除索引 0
arr.clear()           # 清空列表

# 改
arr[0] = 100          # 修改索引 0

# 查
2 in arr              # True（检查是否存在）
arr.index(2)          # 返回值为 2 的索引
arr.count(2)          # 统计值为 2 的数量
```

---

### 列表方法
```python
arr = [3, 1, 4, 1, 5]

# 排序（修改原列表）
arr.sort()            # [1, 1, 3, 4, 5]
arr.sort(reverse=True)  # [5, 4, 3, 1, 1]（降序）

# 排序（返回新列表）
sorted(arr)           # [1, 1, 3, 4, 5]（原列表不变）

# 反转
arr.reverse()         # 反转原列表
reversed(arr)         # 返回迭代器

# 复制
arr2 = arr.copy()     # 浅拷贝
arr3 = arr[:]         # 切片复制
```

---

### 列表推导式
```python
# JavaScript
const arr = [1, 2, 3];
const doubled = arr.map(x => x * 2);
const evens = arr.filter(x => x % 2 === 0);

# Python
arr = [1, 2, 3]
doubled = [x * 2 for x in arr]              # [2, 4, 6]
evens = [x for x in arr if x % 2 == 0]      # [2]

# 嵌套列表推导
matrix = [[1, 2], [3, 4], [5, 6]]
flattened = [num for row in matrix for num in row]  # [1, 2, 3, 4, 5, 6]

# 带条件的复杂推导
result = [x * 2 if x % 2 == 0 else x for x in arr]  # [1, 4, 3]
```

---

## 2. 元组（Tuple）

### 基础概念
```python
# 创建元组
tup = (1, 2, 3)
single = (1,)         # 单元素元组，注意逗号
empty = ()            # 空元组

# 访问元素（同列表）
tup[0]                # 1
tup[-1]               # 3
tup[1:3]              # (2, 3)

# ❌ 不可修改
tup[0] = 100          # TypeError
```

---

### 与列表的区别
| 特性 | 列表 | 元组 |
|------|------|------|
| 语法 | `[]` | `()` |
| 可变性 | 可变 | 不可变 |
| 性能 | 慢 | 快（占用内存更少） |
| 使用场景 | 动态数据 | 固定数据、函数返回值 |

```python
# 列表：动态数据
todo_list = ["写代码", "测试"]
todo_list.append("部署")

# 元组：固定数据
point = (10, 20)      # 坐标不会改变
rgb = (255, 0, 0)     # 颜色值固定
```

---

### 元组解包
```python
# 交换变量（Python 特色）
a, b = 1, 2
a, b = b, a           # 交换，无需中间变量

# 函数返回多个值
def get_user():
    return "Alice", 25, "alice@example.com"

name, age, email = get_user()

# 忽略部分值
name, _, email = get_user()  # _ 表示忽略

# 剩余值
first, *rest = [1, 2, 3, 4]
# first = 1, rest = [2, 3, 4]
```

---

## 3. 字典（Dict）

### 基础操作
```python
# 创建字典
user = {
    "name": "Alice",
    "age": 25,
    "is_active": True
}

# 访问元素
user["name"]          # "Alice"
user.get("age")       # 25
user.get("salary", 0) # 0（键不存在返回默认值）

# 添加/修改
user["email"] = "alice@example.com"  # 添加
user["age"] = 26                     # 修改

# 删除
del user["age"]
user.pop("email")     # 删除并返回值
```

---

### 字典方法
```python
user = {"name": "Alice", "age": 25}

# 获取所有键/值
user.keys()           # dict_keys(['name', 'age'])
user.values()         # dict_values(['Alice', 25])
user.items()          # dict_items([('name', 'Alice'), ('age', 25)])

# 检查键是否存在
"name" in user        # True
"salary" in user      # False

# 合并字典（Python 3.9+）
defaults = {"theme": "dark", "lang": "en"}
user = {**defaults, **user}  # 合并，user 覆盖 defaults

# 更新
user.update({"age": 26, "city": "NYC"})
```

---

### 遍历字典
```python
user = {"name": "Alice", "age": 25}

# 遍历键
for key in user:
    print(key, user[key])

# 遍历键值对（推荐）
for key, value in user.items():
    print(key, value)

# 遍历值
for value in user.values():
    print(value)
```

---

### 字典推导式
```python
# 反转键值
original = {"a": 1, "b": 2}
reversed_dict = {v: k for k, v in original.items()}
# {1: 'a', 2: 'b'}

# 过滤
scores = {"Alice": 85, "Bob": 92, "Charlie": 78}
passed = {k: v for k, v in scores.items() if v >= 80}
# {'Alice': 85, 'Bob': 92}

# 转换值
doubled = {k: v * 2 for k, v in original.items()}
# {'a': 2, 'b': 4}
```

---

### 嵌套字典
```python
# 复杂数据结构
users = {
    "user1": {
        "name": "Alice",
        "age": 25,
        "skills": ["Python", "JS"]
    },
    "user2": {
        "name": "Bob",
        "age": 30,
        "skills": ["Java", "Go"]
    }
}

# 访问嵌套数据
users["user1"]["name"]          # "Alice"
users["user1"]["skills"][0]     # "Python"

# 安全访问（避免 KeyError）
users.get("user3", {}).get("name", "Unknown")  # "Unknown"
```

---

## 4. 集合（Set）

### 基础操作
```python
# 创建集合
s = {1, 2, 3}
s = set([1, 2, 2, 3])  # {1, 2, 3}（自动去重）
empty = set()          # 空集合（不能用 {}，那是字典）

# 添加/删除
s.add(4)               # {1, 2, 3, 4}
s.remove(2)            # {1, 3, 4}（不存在会报错）
s.discard(2)           # 不存在不报错
s.pop()                # 随机删除并返回一个元素

# 检查
2 in s                 # False
len(s)                 # 3
```

---

### 集合运算
```python
a = {1, 2, 3}
b = {2, 3, 4}

# 并集
a | b                  # {1, 2, 3, 4}
a.union(b)

# 交集
a & b                  # {2, 3}
a.intersection(b)

# 差集
a - b                  # {1}（a 有 b 无）
a.difference(b)

# 对称差集
a ^ b                  # {1, 4}（a 或 b 中有，但不同时在两者中）
a.symmetric_difference(b)

# 子集/超集
{1, 2}.issubset(a)     # True
a.issuperset({1, 2})   # True
```

---

### 实战应用
```python
# 去重
arr = [1, 2, 2, 3, 3, 3]
unique = list(set(arr))  # [1, 2, 3]

# 快速判断成员（比列表快）
whitelist = {"user1", "user2", "admin"}
if username in whitelist:  # O(1) 时间复杂度
    allow_access()

# 找出两个列表的差异
list1 = ["a", "b", "c"]
list2 = ["b", "c", "d"]
only_in_1 = list(set(list1) - set(list2))  # ['a']
only_in_2 = list(set(list2) - set(list1))  # ['d']
```

---

## 5. 选择合适的数据结构

### 决策树
```
需要键值对？
├─ 是 → 字典 dict
└─ 否 → 需要去重？
    ├─ 是 → 集合 set
    └─ 否 → 需要修改？
        ├─ 是 → 列表 list
        └─ 否 → 元组 tuple
```

---

### 性能对比
| 操作 | 列表 | 元组 | 字典 | 集合 |
|------|------|------|------|------|
| 索引访问 | O(1) | O(1) | O(1) | ❌ |
| 查找元素 | O(n) | O(n) | O(1) | O(1) |
| 添加元素 | O(1) | ❌ | O(1) | O(1) |
| 删除元素 | O(n) | ❌ | O(1) | O(1) |
| 内存占用 | 中 | 小 | 大 | 中 |

---

### 使用场景
```python
# 列表：有序、可变、允许重复
shopping_list = ["苹果", "香蕉", "苹果"]

# 元组：有序、不可变
coordinates = (10, 20)
rgb_color = (255, 0, 0)

# 字典：键值对
user_info = {"name": "Alice", "age": 25}
config = {"theme": "dark", "lang": "zh"}

# 集合：去重、快速查找
tags = {"python", "javascript", "python"}  # {'python', 'javascript'}
allowed_users = {"admin", "user1", "user2"}
```

---

## 6. 常见操作对照表

### 检查是否存在
```python
# 列表
2 in [1, 2, 3]        # True

# 字典（检查键）
"name" in {"name": "Alice"}  # True

# 集合
2 in {1, 2, 3}        # True
```

---

### 获取长度
```python
len([1, 2, 3])        # 3（列表）
len((1, 2, 3))        # 3（元组）
len({"a": 1, "b": 2}) # 2（字典）
len({1, 2, 3})        # 3（集合）
```

---

### 清空
```python
arr = [1, 2, 3]
arr.clear()           # []

d = {"a": 1}
d.clear()             # {}

s = {1, 2, 3}
s.clear()             # set()
```

---

## 7. 类型转换

```python
# 列表 ↔ 元组
list((1, 2, 3))       # [1, 2, 3]
tuple([1, 2, 3])      # (1, 2, 3)

# 列表 ↔ 集合
list({1, 2, 3})       # [1, 2, 3]（顺序不保证）
set([1, 2, 2, 3])     # {1, 2, 3}（去重）

# 字典 ↔ 列表
list({"a": 1, "b": 2}.keys())    # ['a', 'b']
list({"a": 1, "b": 2}.values())  # [1, 2]
list({"a": 1, "b": 2}.items())   # [('a', 1), ('b', 2)]

# 列表 → 字典
dict([("a", 1), ("b", 2)])       # {'a': 1, 'b': 2}
dict(zip(["a", "b"], [1, 2]))    # {'a': 1, 'b': 2}
```

---

## 8. 进阶技巧

### 多维列表
```python
# 创建 3x3 矩阵
matrix = [[0] * 3 for _ in range(3)]
# [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

# ❌ 错误方式（浅拷贝）
matrix = [[0] * 3] * 3  # 修改一行会影响所有行
```

---

### defaultdict（自动初始化）
```python
from collections import defaultdict

# 统计单词出现次数
word_count = defaultdict(int)  # 默认值为 0
for word in ["apple", "banana", "apple"]:
    word_count[word] += 1
# defaultdict(<class 'int'>, {'apple': 2, 'banana': 1})

# 分组
group = defaultdict(list)
for name, age in [("Alice", 25), ("Bob", 30), ("Alice", 26)]:
    group[name].append(age)
# defaultdict(<class 'list'>, {'Alice': [25, 26], 'Bob': [30]})
```

---

### Counter（计数器）
```python
from collections import Counter

# 统计频率
arr = ["a", "b", "a", "c", "b", "a"]
counter = Counter(arr)
# Counter({'a': 3, 'b': 2, 'c': 1})

counter.most_common(2)  # [('a', 3), ('b', 2)]（最常见的 2 个）
```

---

## 快速参考

```python
# 列表
arr = [1, 2, 3]
arr.append(4)          # 添加
arr.pop()              # 删除末尾
arr[0] = 100           # 修改
2 in arr               # 查找

# 元组
tup = (1, 2, 3)
a, b, c = tup          # 解包

# 字典
d = {"key": "value"}
d["key"]               # 访问
d.get("key", default)  # 安全访问
d.keys()               # 所有键
for k, v in d.items()  # 遍历

# 集合
s = {1, 2, 3}
s.add(4)               # 添加
s.remove(2)            # 删除
s1 | s2                # 并集
s1 & s2                # 交集
```

---

## 延伸阅读

- [常用内置功能](/domains/python/built-in/) - 文件、JSON、日期时间
- [基础语法对照](/domains/python/syntax/) - 变量、函数、控制流
- [Python 编程语言](/domains/python/) - 返回主目录

---

## 练习建议

1. 用列表推导式过滤偶数
2. 用元组交换两个变量
3. 用字典统计单词频率
4. 用集合找出两个列表的交集
5. 实现一个学生成绩管理系统（字典 + 列表）
