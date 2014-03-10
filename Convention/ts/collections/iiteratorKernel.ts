module Convention.Collections {
    export interface IIteratorKernel<TIn, TOut> {
        (item: TIn, i: number): IIterationResult<TOut>
    }
} 