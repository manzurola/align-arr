import { AlignerConfig, Alignment, Chunk, Edit, Operation, Aligner } from './types';
import { cost, distance, ratio, similarity } from './scoring';
export { cost, ratio, distance, similarity, Aligner, AlignerConfig, Alignment, Edit, Chunk, Operation, };
export declare const createAligner: <S, T>(config?: AlignerConfig<any, any> | undefined) => Aligner<S, T>;
