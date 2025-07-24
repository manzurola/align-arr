import { levenshtein } from './levenshtein';
import { cost } from './scoring';

describe('levenshtein', function () {
  describe('alignment of equal length and a different last item', () => {
    it('should have one substitute and cost=1', () => {
      const s = [1, 4, 5];
      const t = [1, 4, 6];
      const actual = levenshtein(s, t);
      expect(actual).toEqual([
        {
          cost: 0,
          operation: 'equal',
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
          operation: 'equal',
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
          operation: 'substitute',
          source: {
            position: 2,
            data: 5,
          },
          target: {
            position: 2,
            data: 6,
          },
        },
      ]);
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

  describe('string alignment', () => {
    it('should align strings as list of chars', () => {
      const s = ['my', 'friend'];
      const t = ['hello', 'there', 'my', 'friend'];
      const alignment = levenshtein([...s], [...t]);
      expect(alignment).toEqual([
        {
          operation: 'insert',
          source: { position: 0, data: undefined },
          target: { position: 0, data: 'hello' },
          cost: 0,
        },
        {
          operation: 'insert',
          source: { position: 0, data: undefined },
          target: { position: 1, data: 'there' },
          cost: 0,
        },
        {
          operation: 'equal',
          source: { position: 0, data: 'my' },
          target: { position: 2, data: 'my' },
          cost: 0,
        },
        {
          operation: 'equal',
          source: { position: 1, data: 'friend' },
          target: { position: 3, data: 'friend' },
          cost: 0,
        },
      ]);
    });
  });

  describe('edge cases', () => {
    it('should align two empty arrays as an empty alignment', () => {
      const s: any[] = [];
      const t: any[] = [];
      const alignment = levenshtein(s, t);
      expect(alignment).toEqual([]);
    });

    it('should align empty source to non-empty target as all inserts', () => {
      const s: any[] = [];
      const t = [1, 2, 3];
      const alignment = levenshtein(s, t);
      expect(alignment.every((e) => e.operation === 'insert')).toBe(true);
      expect(alignment.length).toBe(3);
    });

    it('should align non-empty source to empty target as all deletes', () => {
      const s = [1, 2, 3];
      const t: any[] = [];
      const alignment = levenshtein(s, t);
      expect(alignment.every((e) => e.operation === 'delete')).toBe(true);
      expect(alignment.length).toBe(3);
    });

    it('should handle arrays with undefined and null values', () => {
      const s = [undefined, null];
      const t = [undefined, null];
      const alignment = levenshtein(s, t);
      expect(alignment.every((e) => e.operation === 'equal')).toBe(true);
      expect(alignment.length).toBe(2);
    });

    it('should align arrays with one element each (equal)', () => {
      const s = [42];
      const t = [42];
      const alignment = levenshtein(s, t);
      expect(alignment).toEqual([
        {
          operation: 'equal',
          source: { position: 0, data: 42 },
          target: { position: 0, data: 42 },
          cost: 0,
        },
      ]);
    });

    it('should align arrays with one element each (different)', () => {
      const s = [42];
      const t = [43];
      const alignment = levenshtein(s, t);
      expect(alignment).toEqual([
        {
          operation: 'substitute',
          source: { position: 0, data: 42 },
          target: { position: 0, data: 43 },
          cost: 1,
        },
      ]);
    });
  });
});
