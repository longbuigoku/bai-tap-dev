# DEV-FE-003 · JavaScript Core (ES6+)

## Mục lục

1. [Scope, Closure, Function & xử lý dữ liệu](#1-scope-closure-function--xử-lý-dữ-liệu)
2. [Promise, Event Loop, Modules & Prototype](#2-promise-event-loop-modules--prototype)
3. [Bài tập tổng hợp](#3-bài-tập-tổng-hợp)
4. [Checklist ôn tập](#4-checklist-ôn-tập)

---

# 1. Scope, Closure, Function & xử lý dữ liệu

## 1.1 Scope

### Câu hỏi 1

Đoạn code sau in ra gì?

```js
const name = "Long";

function sayHello() {
  const message = `Hello ${name}`;
  console.log(message);
}

sayHello();
```

### Trả lời

```text
Hello Long
```

`name` nằm trong **global scope**, nên `sayHello()` có thể truy cập được.

JavaScript sử dụng **lexical scope**: phạm vi truy cập biến được xác định dựa trên vị trí function được khai báo trong source code.

---

### Câu hỏi 2

Đoạn code sau có lỗi không?

```js
function test() {
  let message = "Hello";
}

console.log(message);
```

### Trả lời

Có lỗi:

```text
ReferenceError: message is not defined
```

Vì `message` chỉ tồn tại trong **function scope** của `test()`.

---

### Câu hỏi 3

`var`, `let`, `const` khác nhau như thế nào về scope?

### Trả lời

| Keyword | Scope | Re-declare | Re-assign |
|---|---|---:|---:|
| `var` | Function scope | Có | Có |
| `let` | Block scope | Không | Có |
| `const` | Block scope | Không | Không |

Ví dụ:

```js
if (true) {
  var a = 1;
  let b = 2;
  const c = 3;
}

console.log(a); // 1
console.log(b); // ReferenceError
console.log(c); // ReferenceError
```

---

## 1.2 Closure

### Câu hỏi 4

Closure là gì?

### Trả lời

**Closure** xảy ra khi một function có thể truy cập các biến của scope bên ngoài nó, ngay cả khi scope bên ngoài đã thực thi xong.

Ví dụ:

```js
function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

Function bên trong vẫn giữ được quyền truy cập vào `count`.

---

### Câu hỏi 5

Tại sao `count` không bị mất sau khi `createCounter()` chạy xong?

### Trả lời

Vì function trả về tạo ra một **closure**.

```js
return function () {
  count++;
  return count;
};
```

Function này vẫn giữ reference tới lexical environment chứa `count`.

Có thể hiểu đơn giản:

```text
createCounter()
    |
    +-- count = 0
    |
    +-- returned function
             |
             +-- vẫn truy cập được count
```

---

## 1.3 Closure + Array Methods

### Câu hỏi 6

Viết function tạo bộ lọc sản phẩm theo `category`.

Yêu cầu:

- Không dùng `for`
- Sử dụng closure
- Sử dụng `filter()`

### Trả lời

```js
const products = [
  { name: "iPhone", category: "phone" },
  { name: "MacBook", category: "laptop" },
  { name: "Samsung", category: "phone" },
  { name: "Dell", category: "laptop" },
];

function createCategoryFilter(category) {
  return function (products) {
    return products.filter((product) => product.category === category);
  };
}

const phoneFilter = createCategoryFilter("phone");

console.log(phoneFilter(products));
```

Kết quả:

```js
[
  { name: "iPhone", category: "phone" },
  { name: "Samsung", category: "phone" }
]
```

---

## 1.4 `map()`

### Câu hỏi 7

Cho:

```js
const users = [
  { id: 1, name: "Long" },
  { id: 2, name: "An" },
  { id: 3, name: "Minh" },
];
```

Lấy ra một array chỉ chứa tên.

### Trả lời

```js
const names = users.map((user) => user.name);

console.log(names);
```

Kết quả:

```js
["Long", "An", "Minh"]
```

`map()` phù hợp khi muốn **transform từng phần tử** thành giá trị mới.

---

## 1.5 `filter()`

### Câu hỏi 8

Lấy các user có `id > 1`.

### Trả lời

```js
const result = users.filter((user) => user.id > 1);

console.log(result);
```

---

## 1.6 `find()`

### Câu hỏi 9

Tìm user có `id = 2`.

### Trả lời

```js
const user = users.find((user) => user.id === 2);

console.log(user);
```

Kết quả:

```js
{ id: 2, name: "An" }
```

`find()` trả về **phần tử đầu tiên** thỏa điều kiện.

Nếu không tìm thấy:

```js
undefined
```

---

## 1.7 `some()` và `every()`

### Câu hỏi 10

Kiểm tra xem có user nào có `id > 2` không.

### Trả lời

```js
const hasUser = users.some((user) => user.id > 2);

console.log(hasUser); // true
```

`some()` trả về `true` nếu **ít nhất một phần tử** thỏa điều kiện.

---

### Câu hỏi 11

Kiểm tra tất cả user có `id > 0` không.

### Trả lời

```js
const valid = users.every((user) => user.id > 0);

console.log(valid); // true
```

`every()` trả về `true` khi **tất cả phần tử** thỏa điều kiện.

---

## 1.8 `reduce()`

### Câu hỏi 12

Tính tổng giá trị:

```js
const products = [
  { name: "A", price: 100 },
  { name: "B", price: 200 },
  { name: "C", price: 300 },
];
```

Không dùng `for`.

### Trả lời

```js
const total = products.reduce(
  (sum, product) => sum + product.price,
  0
);

console.log(total); // 600
```

Có thể hiểu:

```text
0 + 100 = 100
100 + 200 = 300
300 + 300 = 600
```

---

## 1.9 Kết hợp `filter()` + `map()` + `reduce()`

### Câu hỏi 13

Tính tổng tiền của các sản phẩm có giá từ `200` trở lên.

### Trả lời

```js
const total = products
  .filter((product) => product.price >= 200)
  .reduce((sum, product) => sum + product.price, 0);

console.log(total); // 500
```

Có thể chain các array methods để tạo pipeline xử lý dữ liệu:

```text
products
   ↓
filter()
   ↓
reduce()
   ↓
result
```

---

# 1.10 `this`

## Câu hỏi 14

Đoạn code sau in gì?

```js
const user = {
  name: "Long",

  sayHello() {
    console.log(this.name);
  },
};

user.sayHello();
```

### Trả lời

```text
Long
```

Ở đây:

```js
this === user
```

vì function được gọi thông qua:

```js
user.sayHello()
```

---

## Câu hỏi 15

Arrow function có `this` riêng không?

### Trả lời

**Không.**

Arrow function không tạo `this` riêng mà sử dụng `this` từ lexical scope bên ngoài.

Ví dụ:

```js
const user = {
  name: "Long",

  sayHello: () => {
    console.log(this.name);
  },
};

user.sayHello();
```

Không nên sử dụng arrow function làm method nếu cần `this` của object.

Nên viết:

```js
const user = {
  name: "Long",

  sayHello() {
    console.log(this.name);
  },
};
```

---

## Câu hỏi 16

Giải thích đoạn code:

```js
const user = {
  name: "Long",

  sayHello() {
    setTimeout(() => {
      console.log(this.name);
    }, 1000);
  },
};

user.sayHello();
```

### Trả lời

`this` bên trong arrow function được lấy từ scope bên ngoài.

```js
sayHello() {
  // this === user

  setTimeout(() => {
    // arrow function giữ this của sayHello()
    console.log(this.name);
  }, 1000);
}
```

Kết quả:

```text
Long
```

---

# 2. Promise, Event Loop, Modules & Prototype

# 2.1 Promise

## Câu hỏi 17

Promise là gì?

### Trả lời

Promise đại diện cho kết quả của một operation bất đồng bộ.

Promise có 3 trạng thái:

```text
pending
   ↓
fulfilled

hoặc

pending
   ↓
rejected
```

Ví dụ:

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Success");
  }, 1000);
});

promise.then((result) => {
  console.log(result);
});
```

---

# 2.2 Fetch tuần tự

## Câu hỏi 18

Có 2 API:

```js
const fetchUser = () =>
  fetch("/api/user").then((res) => res.json());

const fetchPosts = () =>
  fetch("/api/posts").then((res) => res.json());
```

Thực hiện request tuần tự.

### Trả lời

```js
async function loadData() {
  const user = await fetchUser();

  const posts = await fetchPosts();

  return {
    user,
    posts,
  };
}
```

Flow:

```text
fetchUser
   ↓
chờ hoàn thành
   ↓
fetchPosts
   ↓
chờ hoàn thành
   ↓
result
```

Nếu hai request không phụ thuộc nhau thì cách này có thể tốn thời gian hơn cần thiết.

---

# 2.3 Promise.all

## Câu hỏi 19

Thực hiện hai request song song bằng `Promise.all()`.

### Trả lời

```js
async function loadData() {
  const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts(),
  ]);

  return {
    user,
    posts,
  };
}
```

Flow:

```text
        ┌── fetchUser ──┐
start ──┤               ├── result
        └── fetchPosts ─┘
```

Hai Promise được khởi chạy gần như cùng lúc.

---

## Câu hỏi 20

Khi nào nên dùng tuần tự và khi nào dùng `Promise.all()`?

### Trả lời

### Dùng tuần tự

Khi request sau **phụ thuộc vào kết quả** request trước.

```js
const user = await fetchUser(userId);

const posts = await fetchPosts(user.id);
```

### Dùng `Promise.all()`

Khi các request **độc lập**:

```js
const [users, products, categories] = await Promise.all([
  fetchUsers(),
  fetchProducts(),
  fetchCategories(),
]);
```

---

## Câu hỏi 21

Điều gì xảy ra nếu một Promise trong `Promise.all()` reject?

### Trả lời

`Promise.all()` sẽ reject ngay khi một Promise reject.

```js
try {
  const [users, products] = await Promise.all([
    fetchUsers(),
    fetchProducts(),
  ]);
} catch (error) {
  console.error(error);
}
```

Nếu cần lấy kết quả của từng Promise kể cả khi một request fail, có thể dùng:

```js
Promise.allSettled()
```

---

# 2.4 Event Loop

## Câu hỏi 22

Đoạn code sau in theo thứ tự nào?

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");
```

### Trả lời

```text
A
C
B
```

Lý do:

```text
Call Stack
    ↓
console.log("A")
    ↓
setTimeout đăng ký callback
    ↓
console.log("C")
    ↓
Call Stack empty
    ↓
Event Loop đưa callback vào Call Stack
    ↓
B
```

`setTimeout(..., 0)` không có nghĩa callback chạy ngay lập tức.

---

## Câu hỏi 23

Đoạn code sau in gì?

```js
console.log("A");

Promise.resolve().then(() => {
  console.log("B");
});

setTimeout(() => {
  console.log("C");
}, 0);

console.log("D");
```

### Trả lời

```text
A
D
B
C
```

Vì:

```text
Synchronous code
    ↓
Microtask
    ↓
Macrotask
```

Trong ví dụ này:

- `A`, `D`: synchronous
- `.then()`: microtask
- `setTimeout()`: macrotask/task

Microtask được xử lý trước timer callback.

---

## Câu hỏi 24

Các thành phần cơ bản của Event Loop gồm gì?

### Trả lời

Có thể hình dung:

```text
                ┌───────────────┐
                │  Call Stack   │
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │ Web APIs /    │
                │ async runtime │
                └───────┬───────┘
                        │
              ┌─────────┴─────────┐
              ▼                   ▼
        Microtask Queue       Task Queue
              │                   │
              └─────────┬─────────┘
                        ▼
                   Event Loop
```

Điểm cần nhớ:

1. JavaScript chạy synchronous code trên Call Stack.
2. Async operation được runtime xử lý.
3. Callback được đưa vào queue phù hợp.
4. Event Loop điều phối callback quay lại Call Stack.
5. Microtask thường được xử lý trước task tiếp theo.

---

# 2.5 Event Loop + Closure

## Câu hỏi 25

Đoạn code sau in gì?

```js
function createLogger(name) {
  return () => {
    console.log(name);
  };
}

const logger = createLogger("Long");

setTimeout(logger, 1000);
```

### Trả lời

Sau khoảng 1 giây:

```text
Long
```

Closure giúp callback vẫn truy cập được biến `name`.

---

# 2.6 Modules

## Câu hỏi 26

Tại sao nên chia code thành nhiều module?

### Trả lời

Module giúp:

- Chia nhỏ code.
- Dễ maintain.
- Dễ test.
- Tái sử dụng function.
- Giảm dependency không cần thiết.
- Dễ phân chia responsibility.

---

## Câu hỏi 27

Refactor file sau thành nhiều module.

### Trước

```js
// app.js

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

function formatCurrency(value) {
  return `${value.toLocaleString("vi-VN")} VND`;
}

const products = [
  { name: "Keyboard", price: 500000 },
  { name: "Mouse", price: 300000 },
];

const total = calculateTotal(products);

console.log(formatCurrency(total));
```

### Trả lời

Tách thành:

```text
src/
├── app.js
├── utils/
│   ├── calculate.js
│   └── currency.js
└── data/
    └── products.js
```

### `utils/calculate.js`

```js
export function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

### `utils/currency.js`

```js
export function formatCurrency(value) {
  return `${value.toLocaleString("vi-VN")} VND`;
}
```

### `data/products.js`

```js
export const products = [
  { name: "Keyboard", price: 500000 },
  { name: "Mouse", price: 300000 },
];
```

### `app.js`

```js
import { calculateTotal } from "./utils/calculate.js";
import { formatCurrency } from "./utils/currency.js";
import { products } from "./data/products.js";

const total = calculateTotal(products);

console.log(formatCurrency(total));
```

---

# 2.7 Prototype

## Câu hỏi 28

Prototype là gì?

### Trả lời

Mỗi JavaScript object có thể liên kết với một object khác thông qua **prototype chain**.

Khi truy cập property/method:

```js
object.someMethod()
```

JavaScript tìm:

```text
object
  ↓
prototype
  ↓
prototype của prototype
  ↓
...
  ↓
null
```

Nếu không tìm thấy property thì kết quả là `undefined`.

---

## Câu hỏi 29

Ví dụ prototype đơn giản.

### Trả lời

```js
const userMethods = {
  sayHello() {
    console.log(`Hello ${this.name}`);
  },
};

const user = Object.create(userMethods);

user.name = "Long";

user.sayHello();
```

Khi gọi:

```js
user.sayHello();
```

JavaScript không tìm thấy `sayHello` trực tiếp trên `user`, nên tìm tiếp trong prototype:

```text
user
  ↓
userMethods
  ↓
Object.prototype
  ↓
null
```

---

## Câu hỏi 30

Class có liên quan gì tới prototype?

### Trả lời

JavaScript `class` là syntax thuận tiện hơn để làm việc với prototype-based inheritance.

Ví dụ:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`Hello ${this.name}`);
  }
}

const user = new User("Long");

user.sayHello();
```

Method:

```js
sayHello()
```

được đặt trên:

```js
User.prototype
```

Có thể kiểm tra:

```js
console.log(User.prototype);
```

---

# 3. Bài tập tổng hợp

## Câu hỏi 31

Cho danh sách:

```js
const users = [
  {
    id: 1,
    name: "Long",
    age: 23,
    active: true,
  },
  {
    id: 2,
    name: "An",
    age: 17,
    active: true,
  },
  {
    id: 3,
    name: "Minh",
    age: 25,
    active: false,
  },
  {
    id: 4,
    name: "Nam",
    age: 30,
    active: true,
  },
];
```

Lấy danh sách tên của các user:

- active
- tuổi >= 18

Không dùng `for`.

### Trả lời

```js
const names = users
  .filter((user) => user.active && user.age >= 18)
  .map((user) => user.name);

console.log(names);
```

Kết quả:

```js
["Long", "Nam"]
```

---

## Câu hỏi 32

Tạo function `createUserFilter()` sử dụng closure để filter theo `active`.

### Trả lời

```js
function createUserFilter(active) {
  return function (users) {
    return users.filter((user) => user.active === active);
  };
}

const activeUsers = createUserFilter(true);

console.log(activeUsers(users));
```

---

## Câu hỏi 33

Tạo function tính tổng tuổi của các user active.

### Trả lời

```js
const totalAge = users
  .filter((user) => user.active)
  .reduce((total, user) => total + user.age, 0);

console.log(totalAge);
```

---

## Câu hỏi 34

Viết function chạy 3 API độc lập song song.

```js
async function fetchUsers() {}
async function fetchProducts() {}
async function fetchCategories() {}
```

### Trả lời

```js
async function loadInitialData() {
  const [users, products, categories] = await Promise.all([
    fetchUsers(),
    fetchProducts(),
    fetchCategories(),
  ]);

  return {
    users,
    products,
    categories,
  };
}
```

---

## Câu hỏi 35

API thứ hai phụ thuộc vào API thứ nhất. Viết code phù hợp.

```js
async function fetchUser() {}
async function fetchUserPosts(userId) {}
```

### Trả lời

```js
async function loadUserData() {
  const user = await fetchUser();

  const posts = await fetchUserPosts(user.id);

  return {
    user,
    posts,
  };
}
```

Không nên dùng `Promise.all()` ở đây vì cần `user.id` trước khi gọi API posts.

---

# 4. Checklist ôn tập

## Scope

- [ ] Hiểu global scope.
- [ ] Hiểu function scope.
- [ ] Hiểu block scope.
- [ ] Phân biệt `var`, `let`, `const`.
- [ ] Hiểu lexical scope.

## Closure

- [ ] Giải thích được closure bằng lời.
- [ ] Viết được counter bằng closure.
- [ ] Hiểu closure giữ reference tới outer scope.
- [ ] Kết hợp closure với `filter()`, `map()`.

## Array Methods

- [ ] `map()` — transform.
- [ ] `filter()` — lọc.
- [ ] `find()` — tìm phần tử đầu tiên.
- [ ] `some()` — ít nhất một phần tử.
- [ ] `every()` — tất cả phần tử.
- [ ] `reduce()` — gom dữ liệu thành một giá trị.
- [ ] Biết chain nhiều method khi hợp lý.

## `this`

- [ ] Hiểu `this` trong object method.
- [ ] Hiểu arrow function không có `this` riêng.
- [ ] Hiểu lexical `this`.
- [ ] Hiểu `this` khi callback được truyền vào.

## Promise

- [ ] Biết 3 trạng thái của Promise.
- [ ] Biết `.then()`, `.catch()`, `.finally()`.
- [ ] Biết `async/await`.
- [ ] Phân biệt tuần tự và song song.
- [ ] Hiểu `Promise.all()`.
- [ ] Biết `Promise.allSettled()`.

## Event Loop

- [ ] Hiểu Call Stack.
- [ ] Hiểu async runtime/Web APIs ở mức khái niệm.
- [ ] Hiểu Microtask Queue.
- [ ] Hiểu Task/Macrotask Queue.
- [ ] Biết Promise callback thường được xử lý trước timer callback.
- [ ] Tự giải thích được output của đoạn code có `Promise` + `setTimeout`.

## Modules

- [ ] Biết `export`.
- [ ] Biết `import`.
- [ ] Biết named export.
- [ ] Biết default export.
- [ ] Biết cách chia file theo responsibility.

## Prototype

- [ ] Hiểu prototype chain.
- [ ] Biết `Object.create()`.
- [ ] Hiểu `Class` liên quan tới prototype.
- [ ] Biết method của class nằm trên prototype.

---

# Quick Interview Q&A

### Q: Closure là gì?

**A:** Closure là function có thể truy cập biến của lexical scope bên ngoài nó, ngay cả khi function bên ngoài đã kết thúc.

### Q: `map()` khác `forEach()` thế nào?

**A:** `map()` tạo và trả về một array mới sau khi transform từng phần tử. `forEach()` chủ yếu dùng để thực hiện side effect và không tạo array kết quả mới.

### Q: Khi nào dùng `Promise.all()`?

**A:** Khi nhiều async operation độc lập và có thể chạy song song.

### Q: `Promise.all()` fail như thế nào?

**A:** Nếu một Promise reject, Promise tổng hợp sẽ reject.

### Q: Promise callback và `setTimeout(..., 0)` cái nào chạy trước?

**A:** Trong trường hợp thông thường, callback của Promise (`then/catch/finally`) thuộc microtask queue và được xử lý trước task từ `setTimeout`.

### Q: Arrow function có `this` riêng không?

**A:** Không. Arrow function lấy `this` từ lexical scope bên ngoài.

### Q: Prototype dùng để làm gì?

**A:** Prototype cho phép object kế thừa property/method từ object khác thông qua prototype chain.

### Q: Khi nào dùng `filter()` thay vì `find()`?

**A:** `filter()` khi cần nhiều phần tử thỏa điều kiện; `find()` khi cần phần tử đầu tiên thỏa điều kiện.

### Q: Khi nào dùng `reduce()`?

**A:** Khi cần gom nhiều phần tử thành một kết quả, ví dụ tổng tiền, đếm số lượng, group dữ liệu hoặc tạo object mới.

---

# Bài tự luyện thêm

## Bài 1 — Closure

Viết:

```js
createMultiplier(2)
```

sao cho:

```js
const double = createMultiplier(2);

double(5); // 10
double(10); // 20
```

## Bài 2 — Array Methods

Cho:

```js
const orders = [
  { id: 1, total: 100, status: "completed" },
  { id: 2, total: 200, status: "pending" },
  { id: 3, total: 300, status: "completed" },
];
```

Tính tổng `total` của các order `completed`.

## Bài 3 — Promise

Viết code chạy song song:

```js
fetchUsers()
fetchProducts()
fetchOrders()
```

và trả về:

```js
{
  users,
  products,
  orders
}
```

## Bài 4 — Event Loop

Không chạy code, hãy đoán output:

```js
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

console.log("4");
```

Đáp án:

```text
1
4
3
2
```

## Bài 5 — Modules

Tách một file chứa:

```js
calculateTotal()
formatCurrency()
validateUser()
```

thành các module riêng và import chúng vào `app.js`.

---

# Tổng kết

Mục tiêu của bài này không chỉ là nhớ syntax mà phải giải thích được **vì sao code chạy như vậy**.

Đặc biệt cần tự giải thích được:

```text
Scope
  ↓
Closure
  ↓
Function + Array Methods
  ↓
Promise
  ↓
Event Loop
  ↓
Modules
  ↓
Prototype
```

Khi làm bài interview JavaScript, ưu tiên:

1. Đọc yêu cầu.
2. Xác định dữ liệu đầu vào.
3. Chọn method phù hợp (`map`, `filter`, `find`, `some`, `every`, `reduce`).
4. Nếu có async, xác định dependency giữa các request.
5. Request độc lập → cân nhắc `Promise.all()`.
6. Request phụ thuộc nhau → xử lý tuần tự.
7. Giải thích được scope, closure và `this`.
8. Giải thích được output của Event Loop thay vì chỉ đoán.
