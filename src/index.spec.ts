import { cost, createAligner, distance, ratio, similarity } from './index';

describe('Use API', () => {
  test('Align two lists of numbers', () => {
    const s = [1];
    const t = [1, 2, 3];
    const aligner = createAligner();
    const alignment = aligner.align(s, t);
    console.log(alignment);
    console.log(cost(alignment));
    console.log(ratio(alignment));
    console.log(distance(alignment));
    console.log(similarity(alignment));
  });
  test('Align two lists of numbers with custom substitution cost', () => {
    const s = [1, 3, 3];
    const t = [1, 2, 3];
    const aligner = createAligner({ subCost: () => 10.0 });
    const alignment = aligner.align(s, t);
    console.log(alignment.map((e) => e.operation !== 'equal').filter((e) => e));
  });
  test('Align two lists of different type with custom equalizer and costs', () => {
    const s = [1, 3, 3];
    const t = ['1', '2', '3'];
    const aligner = createAligner({
      equals: (a, b) => a === Number.parseFloat(b),
    });
    const alignment = aligner.align(s, t);
    console.log(alignment.map((e) => e.operation !== 'equal').filter((e) => e));
  });
});
