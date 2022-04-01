import { Alignment } from './types';

export const cost = (alignment: Alignment) => {
  return alignment.map((edit) => edit.cost).reduce((a, b) => a + b);
};
/**
 * The normalized cost [0, 1]
 */
export const distance = (alignment: Alignment) => {
  return cost(alignment) / alignment.length;
};
/**
 * The inverse of {@link #distance()}
 */
export const similarity = (alignment: Alignment) => {
  return 1 - distance(alignment);
};
/**
 * The normalized cost ratio, defined as (maxLength - cost) / maxLength
 */
export const ratio = (alignment: Alignment) => {
  return (alignment.length - cost(alignment)) / alignment.length;
};
