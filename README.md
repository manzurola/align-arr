# Align-arr 🍭
![maven](https://github.com/manzurola/align-arr/actions/workflows/node.js.yml/badge.svg)

A Typescript array aligner. Find the minimal edit path between two generic arrays.


## Installation

```
npm i align-arr
```
or
```
yarn add align-arr
```

## Usage

Find the minimal edit path from source to target

```ts
import { align } from 'align-arr';

const source = [1, 3, 3];
const target = [1, 2, 3];
const alignment: Edit<number>[] = align(source, target);
```

An alignment is a list of Edits. An Edit references Chunks of source and target, and the Operation that transforms the former to the latter.

```
const edit = alignment[0];
console.log(edit.source.position);
console.log(edit.source.data);
console.log(edit.target.position);
console.log(edit.target.data);
console.log(edit.operation);
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
