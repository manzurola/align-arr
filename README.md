# align-arr
### Find the minimal edit path between two generic arrays.

![maven](https://github.com/manzurola/align-arr/actions/workflows/node.js.yml/badge.svg)

## Installation

```
npm i align-arr
```
or
```
yarn add align-arr
```

## Usage

Find the difference between two arrays of `number`.

```ts
import { align } from 'align-arr';

const source = [1, 3, 3];
const target = [1, 2, 3];

const alignment: Edit<number>[] = align(source, target);

console.log(alignment);
```

```js
[
  {
    operation: 'equal',
    source: { position: 0, data: 1 },
    target: { position: 0, data: 1 },
    cost: 0
  },
  {
    operation: 'substitute',
    source: { position: 1, data: 3 },
    target: { position: 1, data: 2 },
    cost: 1
  },
  {
    operation: 'equal',
    source: { position: 2, data: 3 },
    target: { position: 2, data: 3 },
    cost: 0
  }
]
```

The console logs an array of `Edit` objects describing the difference between `source` and `target`.

```ts
export type Edit<S = any, T = S> = {
  operation: Operation;
  source: Chunk<S>;
  target: Chunk<T>;
  cost: number;
};

export type Operation = 'equal' | 'insert' | 'delete' | 'substitute';

export type Chunk<T = any> = {
  position: number;
  data?: T;
};
```

### Customizing The Aligner

By default, the algorithm compares two elements as `a === b`, and has a fixed cost of `1` for each operation.

In this example, we override the `equals` method to compare between a `number` and a `string`, and assign a fixed cost of `10` to the `substitute` operation, which causes the algorithm to favour `insert` and `delete` instead.

```ts
const source = [1, 3, 3];
const target = ['1', '2', '3'];

const alignment = align(source, target, {
  equals: (a, b) => a === Number.parseFloat(b),
  insCost: (a) => 1,
  delCost: (a) => 1,
  subCost: (a, b) => 10,
});

console.log(alignment);
```

```js
[
  {
    operation: 'equal',
    source: { position: 0, data: 1 },
    target: { position: 0, data: '1' },
    cost: 0
  },
  {
    operation: 'insert',
    source: { position: 1, data: undefined },
    target: { position: 1, data: '2' },
    cost: 1
  },
  {
    operation: 'delete',
    source: { position: 1, data: 3 },
    target: { position: 2, data: undefined },
    cost: 1
  },
  {
    operation: 'equal',
    source: { position: 2, data: 3 },
    target: { position: 2, data: '3' },
    cost: 0
  }
]
```


## Contributions

To contribute to align-arr, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request.

Alternatively see the GitHub documentation on [creating a pull request](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

        
## Contributors
        
Thanks to the following people who have contributed to this project:
        
* [@manzurola](https://github.com/manzurola) 🐈        

## Contact

If you want to contact me you can reach me at [guy.manzurola@gmail.com](guy.manzurola@gmail.com).

## License
        
This project uses the following license: [MIT](https://github.com/manzurola/aligner/blob/main/LICENSE).

