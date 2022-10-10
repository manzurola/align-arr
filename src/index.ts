import {
  AlignerConfig,
  Alignment,
  Chunk,
  Edit,
  Operation,
  Aligner,
} from './types';

import { levenshtein } from './levenshtein';
import { cost, distance, ratio, similarity } from './scoring';

export {
  cost,
  ratio,
  distance,
  similarity,
  Aligner,
  AlignerConfig,
  Alignment,
  Edit,
  Chunk,
  Operation,
};

export const createAligner = <S, T>(config?: AlignerConfig): Aligner<S, T> => {
  return {
    align: (source, target, extConfig) =>
      levenshtein(source, target, config ?? extConfig),
  };
};
