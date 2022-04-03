# align-arr
### Find the minimal edit path between two generic arrays

![maven](https://github.com/manzurola/align-arr/actions/workflows/node.js.yml/badge.svg)

# Installation

```
npm i align-arr
```
or
```
yarn add align-arr
```

# Usage

```ts
import { align } from 'align-arr';

const s = [1, 3, 3];
const t = [1, 2, 3];
const alignment = align(s, t);
```

We can customize the cost functions as we see fit

```ts
const alignment = align(s, t, { subCost: () => 10.0 });
```

And align lists of different types using a custom equals function

```ts
const s = [1, 3, 3];
const t = ['1', '2', '3']; // a list of strings
const alignment = align(s, t, {
  equals: (a, b) => a === Number.parseFloat(b),
});
```
