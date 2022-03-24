import { Alignment, Operation } from './types';
import { levenshtein } from './levenshtein';
import { cost } from './scoring';

describe('levenshtein', function () {
  describe('alignment of equal length and a different last item', () => {
    const s = [1, 4, 5];
    const t = [1, 4, 6];
    const expected: Alignment = [
      {
        cost: 0,
        operation: Operation.Equal,
        source: {
          position: 0,
          data: 1,
        },
        target: {
          position: 0,
          data: 1,
        },
      },
      {
        cost: 0,
        operation: Operation.Equal,
        source: {
          position: 1,
          data: 4,
        },
        target: {
          position: 1,
          data: 4,
        },
      },
      {
        cost: 1,
        operation: Operation.Substitute,
        source: {
          position: 2,
          data: 5,
        },
        target: {
          position: 2,
          data: 6,
        },
      },
    ];
    it('should have one substitute and cost=1', () => {
      const actual = levenshtein(s, t);
      expect(actual).toEqual(expected);
    });
  });

  describe('alignment with custom subCost of 1.5', () => {
    it('should cost=1.5', () => {
      const s = [1, 4, 5];
      const t = [1, 4, 6];
      const alignment = levenshtein(s, t, {
        subCost: () => 1.5,
      });
      expect(cost(alignment)).toEqual(1.5);
    });
  });

  describe('alignment of arrays with large length > 500', () => {
    it('should cost more than zero', () => {
      const s = new Array(500).fill(Math.random());
      const t = new Array(500).fill(Math.random());
      const alignment = levenshtein(s, t);
      expect(cost(alignment)).toBeGreaterThan(0);
    });
  });

  describe('string alignment', () => {
    it('should align strings as list of chars', () => {
      const s = 'hello';
      const t = 'herro';
      const alignment = levenshtein([...s], [...t]);
      expect(cost(alignment)).toEqual(2);
    });
  });
});
