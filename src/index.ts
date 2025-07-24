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

/**
 * Aligns two arrays using the Levenshtein algorithm.
 * @see {levenshtein}
 */
export { align };

/**
 * Calculates the total cost of an alignment.
 * @see {cost}
 */
export { cost };

/**
 * Calculates the normalized cost ratio of an alignment.
 * @see {ratio}
 */
export { ratio };

/**
 * Calculates the normalized distance of an alignment.
 * @see {distance}
 */
export { distance };

/**
 * Calculates the similarity score of an alignment.
 * @see {similarity}
 */
export { similarity };

/**
 * Type for a generic aligner function.
 */
export { Aligner };

/**
 * Configuration options for the aligner.
 */
export { AlignerConfig };

/**
 * Type representing an alignment (array of edits).
 */
export { Alignment };

/**
 * Type representing a single edit operation.
 */
export { Edit };

/**
 * Type representing a chunk (element and its position).
 */
export { Chunk };

/**
 * Type for possible edit operations.
 */
export { Operation };
