import {
  Aligner,
  AlignerConfig,
  Alignment,
  Chunk,
  Edit,
  Operation,
} from './types';

import { levenshtein as align } from './levenshtein';
import { cost, distance, ratio, similarity } from './scoring';

export {
  align,
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
