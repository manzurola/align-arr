export type Aligner<S = any, T = S> = (
  source: S[],
  target: T[],
  config?: AlignerConfig<S, T>
) => Alignment<S, T>;

export interface AlignerConfig<S = any, T = S> {
  delCost?: (s: S) => number;
  insCost?: (t: T) => number;
  subCost?: (s: S, t: T) => number;
  equals?: (s: S, t: T) => boolean;
}

export interface Alignment<S = any, T = S> {
  edits: Edit<S, T>[];
  cost: number;
}

export interface Edit<S, T = S> {
  source: Chunk<S>;
  target: Chunk<T>;
  operation: Operation;
}

export interface Chunk<T> {
  position: number;
  data?: T;
}

export enum Operation {
  Equal,
  Insert,
  Delete,
  Substitute,
}
