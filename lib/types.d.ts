export declare type Aligner<S = any, T = S> = {
    align: AlignerStrategy;
};
export declare type AlignerStrategy = <S = any, T = S>(source: S[], target: T[], config?: AlignerConfig<S, T>) => Alignment<S, T>;
export interface AlignerConfig<S = any, T = S> {
    delCost?: (s: S) => number;
    insCost?: (t: T) => number;
    subCost?: (s: S, t: T) => number;
    equals?: (s: S, t: T) => boolean;
}
export declare type Alignment<S = any, T = S> = Edit<S, T>[];
export interface Edit<S = any, T = S> {
    source: Chunk<S>;
    target: Chunk<T>;
    operation: Operation;
    cost: number;
}
export interface Chunk<T = any> {
    position: number;
    data?: T;
}
export declare type Operation = 'equal' | 'insert' | 'delete' | 'substitute';
