import { align, cost, distance, Edit, ratio, similarity } from './index';

describe('Use API', () => {
  test('Align two lists of numbers', () => {
    const s = [1];
    const t = [1, 2, 3];
    const alignment = align(s, t);
    console.log(alignment);
    console.log(cost(alignment));
    console.log(ratio(alignment));
    console.log(distance(alignment));
    console.log(similarity(alignment));
  });
  test('Align two lists of different type with custom equalizer and costs', () => {
    const s = [1, 3, 3];
    const t = ['1', '2', '3'];
    const alignment = align(s, t, {
      equals: (a, b) => a === Number.parseFloat(b),
      insCost: (a) => 1,
      delCost: (a) => 1,
      subCost: (a, b) => 10,
    });
    expect(alignment).toEqual([
      {
        operation: 'equal',
        source: { position: 0, data: 1 },
        target: { position: 0, data: '1' },
        cost: 0,
      },
      {
        operation: 'insert',
        source: { position: 1, data: undefined },
        target: { position: 1, data: '2' },
        cost: 1,
      },
      {
        operation: 'delete',
        source: { position: 1, data: 3 },
        target: { position: 2, data: undefined },
        cost: 1,
      },
      {
        operation: 'equal',
        source: { position: 2, data: 3 },
        target: { position: 2, data: '3' },
        cost: 0,
      },
    ]);
  });
});
