import { Alignment, Operation } from "./types";
import { levenshtein } from "./levenshtein";

describe("levenshtein", function () {
  describe("alignment of equal length and a diff last item", () => {
    const s = [1, 4, 5];
    const t = [1, 4, 6];
    const expected: Alignment = {
      cost: 1,
      edits: [
        {
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
      ],
    };
    it("should have one substitute and cost=1", () => {
      const actual = levenshtein(s, t);
      expect(actual).toEqual(expected);
    });
  });

  describe("alignment with custom subCost of 1.5", () => {
    it("should cost=1.5", () => {
      const s = [1, 4, 5];
      const t = [1, 4, 6];
      const actual = levenshtein(s, t, {
        subCost: () => 1.5,
      });
      expect(actual.cost).toEqual(1.5);
    });
  });

  describe("alignment of arrays with large length > 500", () => {
    it("should cost more than zero", () => {
      const s = new Array(500).fill(Math.random());
      const t = new Array(500).fill(Math.random());
      const alignment = levenshtein(s, t);
      expect(alignment.cost).toBeGreaterThan(0);
    });
  });

  describe("string alignment", () => {
    it("should align strings as list of chars", () => {
      const s = "hello";
      const t = "herro";
      // levenshtein(s, t);
    });
  });
});
