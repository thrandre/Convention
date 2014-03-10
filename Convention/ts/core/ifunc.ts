module Convention {
    export interface IFunc<TIn, TOut> {
        (item: TIn, i?: number): TOut;
    }
} 