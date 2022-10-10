"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratio = exports.similarity = exports.distance = exports.cost = void 0;
const cost = (alignment) => {
    return alignment.map((edit) => edit.cost).reduce((a, b) => a + b);
};
exports.cost = cost;
/**
 * The normalized cost [0, 1]
 */
const distance = (alignment) => {
    return (0, exports.cost)(alignment) / alignment.length;
};
exports.distance = distance;
/**
 * The inverse of {@link #distance()}
 */
const similarity = (alignment) => {
    return 1 - (0, exports.distance)(alignment);
};
exports.similarity = similarity;
/**
 * The normalized cost ratio, defined as (maxLength - cost) / maxLength
 */
const ratio = (alignment) => {
    return (alignment.length - (0, exports.cost)(alignment)) / alignment.length;
};
exports.ratio = ratio;
