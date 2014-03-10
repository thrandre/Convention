module Convention.Collections {
    export interface IAggregator<TIn, TOut> {
        aggregate(item: TIn);
        getResult(): TOut;
    }
} 