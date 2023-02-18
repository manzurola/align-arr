import { Edit } from './types';

/**
 * The total sum of cost
 *
 * @param alignment
 */
export const cost = (alignment: Edit[]) => {
  return alignment.map((edit) => edit.cost).reduce((a, b) => a + b);
};

/**
 * The normalized cost [0, 1], defined as <code>cost(alignment) / alignment.length</code>
 *
 * @param alignment
 */
export const distance = (alignment: Edit[]) => {
  return cost(alignment) / alignment.length;
};

/**
 * The inverse of {@link #distance()}, defined as <code>1 - distance(alignment)</code>
 *
 * @param alignment
 */
export const similarity = (alignment: Edit[]) => {
  return 1 - distance(alignment);
};

/**
 * The normalized cost ratio, defined as <code>(alignment.length - cost(alignment)) / alignment.length</code>
 *
 * @param alignment
 */
export const ratio = (alignment: Edit[]) => {
  return (alignment.length - cost(alignment)) / alignment.length;
};
