---
title: 基础语法对照
description: JavaScript vs Python 语法对照表
---

# 基础语法对照

> **核心策略**：找到 JS 和 Python 的对应关系，快速迁移知识

---

## 1. 变量与类型

### 变量声明
```python
# JavaScript
let name = "Alice";
const age = 25;
var isActive = true;  // 不推荐

# Python（无需声明关键字）
name = "Alice"
age = 25
is_active = True
```

**关键差异**：
- Python 无需 `let/const/var`，直接赋值
- Python 使用蛇形命名 `is_active`，JS 使用驼峰 `isActive`

---

### 基础数据类型
| JavaScript | Python | 示例 |
|------------|--------|------|
| `Number` | `int` | `x = 42` |
| `Number` | `float` | `pi = 3.14` |
| `String` | `str` | `name = "Alice"` |
| `Boolean` | `bool` | `flag = True`（首字母大写） |
| `null` | `None` | `value = None` |
| `undefined` | （无等价） | 通常用 `None` |

---

### 类型检查
```python
# JavaScript
typeof "hello"  // "string"
typeof 42       // "number"

# Python
type("hello")   # <class 'str'>
type(42)        # <class 'int'>

# 类型判断
isinstance("hello", str)   # True
isinstance(42, int)        # True
```

---

### 类型转换
```python
# JavaScript
String(42)        // "42"
Number("42")      // 42
Boolean(1)        // true

# Python
str(42)           # "42"
int("42")         # 42
bool(1)           # True

# 常见转换
float("3.14")     # 3.14
int(3.14)         # 3（截断）
list("hello")     # ['h', 'e', 'l', 'l', 'o']
```

---

## 2. 字符串操作

### 字符串拼接
```python
# JavaScript
const name = "Alice";
const age = 25;
const msg = `${name} is ${age} years old`;  // 模板字符串

# Python（推荐 f-string）
name = "Alice"
age = 25
msg = f"{name} is {age} years old"  # f-string（Python 3.6+）

# Python（旧写法）
msg = "{} is {} years old".format(name, age)
msg = name + " is " + str(age) + " years old"
```

---

### 字符串方法
| 操作 | JavaScript | Python |
|------|------------|--------|
| 转大写 | `str.toUpperCase()` | `str.upper()` |
| 转小写 | `str.toLowerCase()` | `str.lower()` |
| 去除空格 | `str.trim()` | `str.strip()` |
| 分割 | `str.split(",")` | `str.split(",")` |
| 替换 | `str.replace("a", "b")` | `str.replace("a", "b")` |
| 查找 | `str.indexOf("x")` | `str.find("x")` 或 `str.index("x")` |
| 包含 | `str.includes("x")` | `"x" in str` |

```python
# JavaScript
"hello".toUpperCase()  // "HELLO"
"  hi  ".trim()        // "hi"
"a,b,c".split(",")     // ["a", "b", "c"]

# Python
"hello".upper()        # "HELLO"
"  hi  ".strip()       # "hi"
"a,b,c".split(",")     # ['a', 'b', 'c']
```

---

### 多行字符串
```python
# JavaScript
const text = `
  第一行
  第二行
`;

# Python（三引号）
text = """
  第一行
  第二行
"""
```

---

## 3. 数组/列表

### 创建与访问
```python
# JavaScript
const arr = [1, 2, 3];
console.log(arr[0]);    // 1
console.log(arr.length); // 3

# Python
arr = [1, 2, 3]
print(arr[0])     # 1
print(len(arr))   # 3（注意：len 是函数，不是属性）
```

---

### 常用方法
| 操作 | JavaScript | Python |
|------|------------|--------|
| 添加元素 | `arr.push(4)` | `arr.append(4)` |
| 删除末尾 | `arr.pop()` | `arr.pop()` |
| 插入 | `arr.splice(1, 0, 99)` | `arr.insert(1, 99)` |
| 删除元素 | `arr.splice(1, 1)` | `arr.pop(1)` 或 `del arr[1]` |
| 拼接 | `arr1.concat(arr2)` | `arr1 + arr2` |
| 包含 | `arr.includes(3)` | `3 in arr` |

```python
# JavaScript
const arr = [1, 2, 3];
arr.push(4);           // [1, 2, 3, 4]
arr.pop();             // [1, 2, 3]
arr.includes(2);       // true

# Python
arr = [1, 2, 3]
arr.append(4)          # [1, 2, 3, 4]
arr.pop()              # [1, 2, 3]
2 in arr               # True
```

---

### 列表切片（Python 特有）
```python
arr = [0, 1, 2, 3, 4, 5]

arr[1:4]      # [1, 2, 3]（索引 1-3，不包含 4）
arr[:3]       # [0, 1, 2]（从头到索引 2）
arr[3:]       # [3, 4, 5]（从索引 3 到末尾）
arr[-1]       # 5（最后一个元素）
arr[-2:]      # [4, 5]（最后两个元素）
arr[::2]      # [0, 2, 4]（每隔一个取值）
arr[::-1]     # [5, 4, 3, 2, 1, 0]（反转）

# JavaScript 等价
arr.slice(1, 4)       // [1, 2, 3]
arr.slice(-1)         // [5]
arr.reverse()         // [5, 4, 3, 2, 1, 0]
```

---

### 列表推导式（Python 特色）
```python
# JavaScript（需要 map）
const arr = [1, 2, 3];
const doubled = arr.map(x => x * 2);  // [2, 4, 6]
const evens = arr.filter(x => x % 2 === 0);  // [2]

# Python（列表推导式）
arr = [1, 2, 3]
doubled = [x * 2 for x in arr]         # [2, 4, 6]
evens = [x for x in arr if x % 2 == 0] # [2]

# 等价于
doubled = []
for x in arr:
    doubled.append(x * 2)
```

---

## 4. 对象/字典

### 创建与访问
```python
# JavaScript
const user = {
  name: "Alice",
  age: 25
};
console.log(user.name);     // "Alice"
console.log(user["age"]);   // 25

# Python（字典 dict）
user = {
    "name": "Alice",
    "age": 25
}
print(user["name"])         # "Alice"（必须用方括号，无点语法）
print(user.get("age"))      # 25（推荐，不存在返回 None）
```

**重要差异**：Python 字典无点语法，必须用 `dict["key"]`

---

### 常用操作
| 操作 | JavaScript | Python |
|------|------------|--------|
| 获取键 | `Object.keys(obj)` | `dict.keys()` |
| 获取值 | `Object.values(obj)` | `dict.values()` |
| 获取键值对 | `Object.entries(obj)` | `dict.items()` |
| 检查键 | `"key" in obj` | `"key" in dict` |
| 删除键 | `delete obj.key` | `del dict["key"]` |

```python
# JavaScript
const user = { name: "Alice", age: 25 };
Object.keys(user);          // ["name", "age"]
Object.values(user);        // ["Alice", 25]
"name" in user;             // true

# Python
user = {"name": "Alice", "age": 25}
list(user.keys())           # ['name', 'age']
list(user.values())         # ['Alice', 25]
"name" in user              # True
```

---

### 遍历字典
```python
# JavaScript
for (const key in obj) {
  console.log(key, obj[key]);
}

# Python（推荐）
for key, value in user.items():
    print(key, value)

# Python（仅键）
for key in user:
    print(key, user[key])
```

---

## 5. 函数

### 函数定义
```python
# JavaScript
function add(a, b) {
  return a + b;
}
const add = (a, b) => a + b;  // 箭头函数

# Python
def add(a, b):
    return a + b
```

---

### 默认参数
```python
# JavaScript
function greet(name = "Guest") {
  return `Hello, ${name}`;
}

# Python
def greet(name="Guest"):
    return f"Hello, {name}"

greet()          # "Hello, Guest"
greet("Alice")   # "Hello, Alice"
```

---

### 可变参数
```python
# JavaScript（剩余参数）
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3);  // 6

# Python
def sum_all(*numbers):
    return sum(numbers)

sum_all(1, 2, 3)  # 6
```

---

### 命名参数
```python
# JavaScript（解构）
function createUser({ name, age }) {
  console.log(name, age);
}
createUser({ name: "Alice", age: 25 });

# Python（关键字参数）
def create_user(name, age):
    print(name, age)

create_user(name="Alice", age=25)
create_user(age=25, name="Alice")  # 顺序无关
```

---

### Lambda 表达式
```python
# JavaScript
const double = x => x * 2;

# Python
double = lambda x: x * 2

# 常用于排序、过滤
arr = [3, 1, 2]
sorted(arr, key=lambda x: -x)  # [3, 2, 1]（降序）
```

---

## 6. 控制流

### 条件判断
```python
# JavaScript
if (age >= 18) {
  console.log("成年");
} else if (age >= 13) {
  console.log("青少年");
} else {
  console.log("儿童");
}

# Python（注意缩进和冒号）
if age >= 18:
    print("成年")
elif age >= 13:      # elif 不是 else if
    print("青少年")
else:
    print("儿童")
```

---

### 三元运算符
```python
# JavaScript
const status = age >= 18 ? "成年" : "未成年";

# Python
status = "成年" if age >= 18 else "未成年"
```

---

### 循环

#### for 循环
```python
# JavaScript（传统）
for (let i = 0; i < 5; i++) {
  console.log(i);
}

# Python
for i in range(5):   # range(5) 生成 0-4
    print(i)

# 遍历数组
arr = ["a", "b", "c"]
for item in arr:
    print(item)

# 带索引遍历
for index, item in enumerate(arr):
    print(index, item)  # 0 a, 1 b, 2 c
```

---

#### while 循环
```python
# JavaScript
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

# Python
i = 0
while i < 5:
    print(i)
    i += 1  # Python 无 i++ 语法
```

---

### 循环控制
```python
# JavaScript & Python 相同
for i in range(10):
    if i == 3:
        continue  # 跳过本次循环
    if i == 7:
        break     # 退出循环
    print(i)
```

---

## 7. 真值判断

### 假值列表
| JavaScript | Python |
|------------|--------|
| `false` | `False` |
| `0` | `0` |
| `""` | `""` |
| `null` | `None` |
| `undefined` | （无等价，用 `None`） |
| `NaN` | （无等价） |

```python
# JavaScript
if (!value) { }

# Python（空列表、字典也为 False）
if not value:
    pass

# 假值示例
bool(False)  # False
bool(0)      # False
bool("")     # False
bool(None)   # False
bool([])     # False（空列表）
bool({})     # False（空字典）
```

---

### 逻辑运算符
| JavaScript | Python |
|------------|--------|
| `&&` | `and` |
| `\|\|` | `or` |
| `!` | `not` |

```python
# JavaScript
if (age >= 18 && hasLicense) { }
if (isAdmin || isModerator) { }
if (!isDeleted) { }

# Python
if age >= 18 and has_license:
    pass
if is_admin or is_moderator:
    pass
if not is_deleted:
    pass
```

---

## 8. 异常处理

```python
# JavaScript
try {
  riskyOperation();
} catch (error) {
  console.error(error);
} finally {
  cleanup();
}

# Python
try:
    risky_operation()
except Exception as error:
    print(error)
finally:
    cleanup()

# 捕获特定异常
try:
    x = int("abc")
except ValueError:
    print("无法转换为整数")
```

---

## 9. 常见陷阱

### 陷阱 1：缩进混用
```python
# ❌ 错误：Tab 和空格混用
def test():
    print("hello")  # 4 空格
	print("world")  # 1 Tab（报错）

# ✅ 正确：统一使用 4 空格
def test():
    print("hello")
    print("world")
```

---

### 陷阱 2：可变默认参数
```python
# ❌ 错误：列表作为默认参数
def add_item(item, arr=[]):
    arr.append(item)
    return arr

add_item(1)  # [1]
add_item(2)  # [1, 2]（期望 [2]）

# ✅ 正确：使用 None
def add_item(item, arr=None):
    if arr is None:
        arr = []
    arr.append(item)
    return arr
```

---

### 陷阱 3：整数除法
```python
# JavaScript
5 / 2      // 2.5

# Python 3
5 / 2      # 2.5（浮点除法）
5 // 2     # 2（整数除法，向下取整）
5 % 2      # 1（取余）

# Python 2（已废弃）
5 / 2      # 2（整数除法）
```

---

## 快速参考卡片

### 数据结构
```python
# 列表（可变）
arr = [1, 2, 3]

# 元组（不可变）
tup = (1, 2, 3)

# 字典
dic = {"key": "value"}

# 集合（去重）
s = {1, 2, 3}
```

---

### 常用内置函数
```python
len(arr)          # 长度
sum([1, 2, 3])    # 求和 → 6
max([1, 2, 3])    # 最大值 → 3
min([1, 2, 3])    # 最小值 → 1
sorted([3, 1, 2]) # 排序 → [1, 2, 3]
reversed([1, 2])  # 反转 → [2, 1]
```

---

### 字符串格式化
```python
name = "Alice"
age = 25

# f-string（推荐）
f"{name} is {age} years old"

# format
"{} is {} years old".format(name, age)

# % 格式化（旧）
"%s is %d years old" % (name, age)
```

---

## 延伸阅读

- [数据结构详解](/domains/python/data-structures/) - 列表、字典、元组、集合
- [常用内置功能](/domains/python/built-in/) - 文件、JSON、日期时间
- [Python 编程语言](/domains/python/) - 返回主目录

---

## 练习建议

### 10 个小练习（30分钟）
1. 变量声明与类型转换
2. 字符串 f-string 格式化
3. 列表增删改查
4. 字典增删改查
5. for 循环遍历列表
6. while 循环实现倒计时
7. 函数定义与默认参数
8. 列表推导式实现过滤
9. 条件判断（if/elif/else）
10. 异常处理（try/except）

每个练习写 5 行代码，完成后可阅读下一章节。
