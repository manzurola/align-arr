import { align, cost, distance, ratio, similarity } from './index';

describe('Use API', () => {
  xtest('Align two lists of numbers', () => {
    const s = [1, 3, 3];
    const t = [1, 2, 3];
    const alignment = align(s, t);
    console.log(alignment);
    console.log(cost(alignment));
    console.log(ratio(alignment));
    console.log(distance(alignment));
    console.log(similarity(alignment));
  });
  xtest('Align two lists of numbers with custom substitution cost', () => {
    const s = [1, 3, 3];
    const t = [1, 2, 3];
    const alignment = align(s, t, { subCost: () => 10.0 });
    console.log(alignment.map((e) => e.operation).filter((e) => e));
  });
});
