import { Aligner, Edit, Operation } from "./types";

interface Cell {
  cost: number;
  op?: Operation;
}

const defaultCost = () => 1;
const defaultEquals = (s: unknown, t: unknown) => s === t;

export const levenshtein: Aligner = (
  s,
  t,
  {
    delCost = defaultCost,
    insCost = defaultCost,
    subCost = defaultCost,
    equals = defaultEquals,
  } = {}
) => {
  const sLen = s.length;
  const tLen = t.length;
  const matrix = initMatrix(sLen, tLen);

  for (let i = 0; i < sLen; i++) {
    for (let j = 0; j < tLen; j++) {
      const sTok = s[i];
      const tTok = t[j];

      if (equals(sTok, tTok)) {
        matrix[i + 1][j + 1].cost = matrix[i][j].cost;
        matrix[i + 1][j + 1].op = Operation.Equal;
      } else {
        const costDel = matrix[i][j + 1].cost + delCost(sTok);
        const costIns = matrix[i + 1][j].cost + insCost(tTok);
        const costSub = matrix[i][j].cost + subCost(sTok, tTok);
        let minCost = costDel;
        let minCostOp = Operation.Delete;
        if (costIns < costDel) {
          minCostOp = Operation.Insert;
          minCost = costIns;
        } else if (costSub < costDel) {
          minCostOp = Operation.Substitute;
          minCost = costSub;
        }

        matrix[i + 1][j + 1].op = minCostOp;
        matrix[i + 1][j + 1].cost = minCost;
      }
    }
  }

  const edits = backtrack(matrix, s, t);
  const cost = matrix[sLen][tLen].cost;
  return {
    edits,
    cost,
  };
};

const initMatrix = (sLen: number, tLen: number): Cell[][] => {
  const matrix: Cell[][] = [...Array(sLen + 1)].map(() =>
    [...Array(tLen + 1)].map(() => ({
      cost: 0.0,
    }))
  );
  // Fill in the edges
  for (let i = 1; i < sLen + 1; i++) {
    matrix[i][0].cost = matrix[i - 1][0].cost + 1;
    matrix[i][0].op = Operation.Delete;
  }
  for (let j = 1; j < tLen + 1; j++) {
    matrix[0][j].cost = matrix[0][j - 1].cost + 1;
    matrix[0][j].op = Operation.Insert;
  }
  return matrix;
};

const backtrack = (
  matrix: Cell[][],
  s: unknown[],
  t: unknown[]
): Edit<unknown>[] => {
  let i = matrix.length - 1;
  let j = matrix[0].length - 1;
  const sequence: Edit<unknown>[] = [];
  // Work backwards from bottom right until we hit top left
  let iPrev = i,
    jPrev = j;
  while (i + j != 0) {
    const op = matrix[i][j].op;
    switch (op) {
      case Operation.Equal:
      case Operation.Substitute:
        iPrev -= 1;
        jPrev -= 1;
        break;
      case Operation.Delete:
        iPrev -= 1;
        jPrev = j;
        break;
      case Operation.Insert:
        iPrev = i;
        jPrev -= 1;
        break;
      default:
        throw Error("No op found");
    }
    sequence.push({
      operation: op,
      source: {
        position: iPrev,
        data: s[iPrev],
      },
      target: {
        position: jPrev,
        data: t[jPrev],
      },
    });
    i = iPrev;
    j = jPrev;
  }

  return sequence.reverse();
};
