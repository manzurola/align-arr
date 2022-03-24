import {
  Aligner,
  AlignerConfig,
  Alignment,
  Edit,
  Chunk,
  Operation,
} from './types';

import { levenshtein as align } from './levenshtein';
import { cost, ratio, distance, similarity } from './scoring';

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
