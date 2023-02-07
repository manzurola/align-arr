# Align-arr 🍭
![maven](https://github.com/manzurola/align-arr/actions/workflows/node.js.yml/badge.svg)

A Typescript array aligner using the Levenshtein Distance algorithm. Find the minimal edit path between two generic arrays.


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

An alignment is a list of Edits. An Edit references a source Chunk and a target Chunk, and the Operation that transforms the former to the latter.

```ts
const edit = alignment[0];
console.log(edit.source.position);
console.log(edit.source.data);
console.log(edit.target.position);
console.log(edit.target.data);
console.log(edit.operation);
```

The `align` function accepts an optional configuration object as the last argument.
We use it to configure the 3 cost functions and the equals method.

```ts
const alignmentWithCustomCost = align(source, target, { subCost: (s, t) => 10.0 });
```

Overriding the `equals` method enables us to align arrays of different types.

```ts
const sourceNumbers = [1, 3, 3];
const targetStrings = ['1', '2', '3']; // a list of strings
const alignmentOfDifferentTypes = align(sourceNumbers, targetStrings, {
  equals: (s, t) => s === Number.parseFloat(t),
});
```
