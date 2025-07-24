import { Aligner, Edit, Operation } from './types';

const defaultCost = () => 1.0;
const defaultEquals = (s: unknown, t: unknown) => s === t;

/**
 * Computes the minimal edit path (Levenshtein distance) between two arrays.
 * Returns an array of edit operations (alignment) to transform source into target.
 *
 * @template S - Source element type
 * @template T - Target element type
 * @param {S[]} s - Source array
 * @param {T[]} t - Target array
 * @param {AlignerConfig<S, T>} [config] - Optional configuration for custom costs and equality
 * @returns {Edit<S, T>[]} The alignment (edit script)
 */
export const levenshtein: Aligner = (
  s,
  t,
  {
    delCost = defaultCost,
    insCost = defaultCost,
    subCost = defaultCost,
    equals = defaultEquals,
  } = {},
) => {
  const sLen = s.length;
  const tLen = t.length;
  const matrix = initMatrix(sLen, tLen);

  for (let i = 0; i < sLen; i++) {
    for (let j = 0; j < tLen; j++) {
      const si = s[i];
      const ti = t[j];
      if (equals(si, ti)) {
        matrix[i + 1][j + 1].cost = matrix[i][j].cost;
        matrix[i + 1][j + 1].op = 'equal';
      } else {
        const opCostDel = delCost(si);
        const costDel = matrix[i][j + 1].cost + opCostDel;
        const opCostIns = insCost(ti);
        const costIns = matrix[i + 1][j].cost + opCostIns;
        const opCostSub = subCost(si, ti);
        const costSub = matrix[i][j].cost + opCostSub;
        let minCostOpCost = opCostDel;
        let minCost = costDel;
        let minCostOp: Operation = 'delete';
        if (costIns < costDel) {
          minCostOp = 'insert';
          minCost = costIns;
          minCostOpCost = opCostIns;
        } else if (costSub < costDel) {
          minCostOp = 'substitute';
          minCost = costSub;
          minCostOpCost = opCostSub;
        }
        matrix[i + 1][j + 1].op = minCostOp;
        matrix[i + 1][j + 1].cost = minCost;
        matrix[i + 1][j + 1].opCost = minCostOpCost;
      }
    }
  }

  return backtrack(matrix, s, t);
};

/**
 * Initializes the dynamic programming matrix for Levenshtein computation.
 * @param sLen Source array length
 * @param tLen Target array length
 * @returns {Cell[][]} Initialized matrix
 */
const initMatrix = (sLen: number, tLen: number): Cell[][] => {
  const matrix: Cell[][] = [...Array(sLen + 1)].map(() =>
    [...Array(tLen + 1)].map(() => ({
      cost: 0.0,
      opCost: 0.0,
    })),
  );
  // Fill in the edges
  for (let i = 1; i < sLen + 1; i++) {
    matrix[i][0].cost = matrix[i - 1][0].cost + 1;
    matrix[i][0].op = 'delete';
  }
  for (let j = 1; j < tLen + 1; j++) {
    matrix[0][j].cost = matrix[0][j - 1].cost + 1;
    matrix[0][j].op = 'insert';
  }
  return matrix;
};

/**
 * Backtracks through the matrix to construct the alignment (edit script).
 * @param matrix The DP matrix
 * @param s Source array
 * @param t Target array
 * @returns {Edit[]} The alignment (edit script)
 */
const backtrack = (matrix: Cell[][], s: unknown[], t: unknown[]): Edit[] => {
  let i = matrix.length - 1;
  let j = matrix[0].length - 1;
  const sequence: Edit[] = [];
  // Work backwards from bottom right until we hit top left
  let iPrev = i,
    jPrev = j;
  let sData, tData;
  while (i + j != 0) {
    const op = matrix[i][j].op;
    switch (op) {
      case 'equal':
        iPrev -= 1;
        jPrev -= 1;
        sData = s[iPrev];
        tData = t[jPrev];
        break;
      case 'substitute':
        iPrev -= 1;
        jPrev -= 1;
        sData = s[iPrev];
        tData = t[jPrev];
        break;
      case 'delete':
        iPrev -= 1;
        jPrev = j;
        sData = s[iPrev];
        tData = undefined;
        break;
      case 'insert':
        iPrev = i;
        jPrev -= 1;
        sData = undefined;
        tData = t[jPrev];
        break;
      default:
        throw Error('No op found');
    }
    sequence.push({
      operation: op,
      source: {
        position: iPrev,
        data: sData,
      },
      target: {
        position: jPrev,
        data: tData,
      },
      cost: matrix[i][j].opCost,
    });
    i = iPrev;
    j = jPrev;
  }

  return sequence.reverse();
};

/**
 * Internal cell structure for DP matrix.
 * @private
 */
interface Cell {
  cost: number;
  op?: Operation;
  opCost: number;
}
