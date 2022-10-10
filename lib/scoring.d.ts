import { Alignment } from './types';
export declare const cost: (alignment: Alignment<any, any>) => number;
/**
 * The normalized cost [0, 1]
 */
export declare const distance: (alignment: Alignment<any, any>) => number;
/**
 * The inverse of {@link #distance()}
 */
export declare const similarity: (alignment: Alignment<any, any>) => number;
/**
 * The normalized cost ratio, defined as (maxLength - cost) / maxLength
 */
export declare const ratio: (alignment: Alignment<any, any>) => number;
