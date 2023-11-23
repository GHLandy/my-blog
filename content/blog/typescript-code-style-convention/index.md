---
title: TypeScript 代码风格与约定
date: '2023-11-23T11:05:15.844Z'
description: 本文摘抄《深入理解 TypeScript》中的代码风格指南与代码约定
---

## 变量和函数

使用 camelCase 形式为变量和函数命名。原因：JavaScript 的惯例。

- 好的命名方式

```ts
var fooVar;
function barFunc() {}
```

- 不好的命名方式

```ts
var FooVar;
function BarFunc() {}
```

## 类 (Class)

使用 PascalCase 形式为类命名。原因：在标准的 JavaScript 中通常是这么做的。

- 好的命名方式

```ts
class Foo {}
```

- 不好的命名方式

```ts
class foo {}
```

类的属性和方法使用 camelCase 方式进行命名。原因：自然地遵循变量和函数命名的约定。

- 好的命名方式

```ts
class Foo {
  bar: number;
  baz() {}
}
```

- 不好的命名方式

```ts
class Foo {
  Bar: number;
  Baz() {}
}
```

## 接口 (interface)

使用 PascalCase 形式为接口命名。原因：和类相同。

接口成员使用 camelCase 方式进行命名。原因：和类的成员使用相同方式进行命名。

- 好的命名方式

```ts
interface Foor {}
```

- 不好的命名方式

```ts
interface IFoor {}
```

## 类型别名 (type)

类型别名使用 PascalCase 形式进行命名。原因：和类相同。
类型别名成员使用 camelCase 形式进行命名。原因：和类的成员使用相同方式进行命名。

## 命名空间 (namespace)

命名空间使用 PascalCase 形式进行命名。原因：遵循 TypeScript 团队惯例，命名空间实际上只是一个具有静态成员的类，类的命名形式是 PascalCase，因此，命名空间的命名形式也是 PascalCase。

- 好的命名方式

```ts
namespace Foo {}
```

- 不好的命名方式

```ts
namespace foo {}
```

## 枚举类型 (enum)

枚举类型使用 PascalCase 形式进行命名。原因：和类相同。

- 好的命名方式

```ts
enum Color {}
```

- 不好的命名方式

```ts
enum color {}
```

枚举类型成员使用 PascalCase 形式进行命名。原因：遵循 TypeScript 团队惯例，例如 SyntaxKind.StringLiteral，这也有助于将其他语言的代码生成转换为 TypeScript 代码。

- 好的命名方式

```ts
enum Color {
  Red
}
```

- 不好的命名方式

```ts
enum Color {
  red
}
```
