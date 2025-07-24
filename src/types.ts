/**
 * Type for a generic aligner function that computes an alignment (edit script) between two arrays.
 */
export type Aligner = <S = any, T = S>(
  source: S[],
  target: T[],
  config?: AlignerConfig<S, T>,
) => Edit<S, T>[];

/**
 * Configuration options for customizing the aligner.
 * - delCost: Cost function for deletions
 * - insCost: Cost function for insertions
 * - subCost: Cost function for substitutions
 * - equals: Equality function for elements
 */
export type AlignerConfig<S = any, T = S> = {
  delCost?: (s: S) => number;
  insCost?: (t: T) => number;
  subCost?: (s: S, t: T) => number;
  equals?: (s: S, t: T) => boolean;
};

/**
 * Type representing an alignment (array of edits).
 */
export type Alignment<S = any, T = S> = Edit<S, T>[];

/**
 * Represents a single edit operation in an alignment.
 */
export type Edit<S = any, T = S> = {
  operation: Operation;
  source: Chunk<S>;
  target: Chunk<T>;
  cost: number;
};

/**
 * Represents a chunk (element and its position) in the source or target array.
 */
export type Chunk<T = any> = {
  position: number;
  data?: T;
};

/**
 * Possible edit operations in an alignment.
 * - 'equal': Elements are equal
 * - 'insert': Element inserted
 * - 'delete': Element deleted
 * - 'substitute': Element substituted
 */
export type Operation = 'equal' | 'insert' | 'delete' | 'substitute';
