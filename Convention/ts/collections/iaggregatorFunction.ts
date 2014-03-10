module Convention.Collections {
    export interface IAggregatorFunction<TIn> {
        (agg: TIn, next: TIn): TIn;
    }
} 