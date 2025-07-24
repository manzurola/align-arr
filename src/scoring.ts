import { Edit } from './types';

/**
 * Calculates the total sum of costs for an alignment.
 * @param alignment Array of edit operations
 * @returns Total cost (number)
 */
export const cost = (alignment: Edit[]) => {
  return alignment.map((edit) => edit.cost).reduce((a, b) => a + b);
};

/**
 * Calculates the normalized cost [0, 1] for an alignment.
 * Defined as cost(alignment) / alignment.length.
 * @param alignment Array of edit operations
 * @returns Normalized distance (number)
 */
export const distance = (alignment: Edit[]) => {
  return cost(alignment) / alignment.length;
};

/**
 * Calculates the similarity score for an alignment.
 * Defined as 1 - distance(alignment).
 * @param alignment Array of edit operations
 * @returns Similarity score (number)
 */
export const similarity = (alignment: Edit[]) => {
  return 1 - distance(alignment);
};

/**
 * Calculates the normalized cost ratio for an alignment.
 * Defined as (alignment.length - cost(alignment)) / alignment.length.
 * @param alignment Array of edit operations
 * @returns Normalized ratio (number)
 */
export const ratio = (alignment: Edit[]) => {
  return (alignment.length - cost(alignment)) / alignment.length;
};
