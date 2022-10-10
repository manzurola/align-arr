"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAligner = exports.similarity = exports.distance = exports.ratio = exports.cost = void 0;
const levenshtein_1 = require("./levenshtein");
const scoring_1 = require("./scoring");
Object.defineProperty(exports, "cost", { enumerable: true, get: function () { return scoring_1.cost; } });
Object.defineProperty(exports, "distance", { enumerable: true, get: function () { return scoring_1.distance; } });
Object.defineProperty(exports, "ratio", { enumerable: true, get: function () { return scoring_1.ratio; } });
Object.defineProperty(exports, "similarity", { enumerable: true, get: function () { return scoring_1.similarity; } });
const createAligner = (config) => {
    return {
        align: (source, target, extConfig) => (0, levenshtein_1.levenshtein)(source, target, config !== null && config !== void 0 ? config : extConfig),
    };
};
exports.createAligner = createAligner;
