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

```
import { align } from 'align-arr';

const s = [1, 3, 3];
const t = [1, 2, 3];
const alignment = align(s, t);
```
