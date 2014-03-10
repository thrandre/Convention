module Convention.Collections {
    export interface IIterationResult<TIn> {
        result: TIn;
        shouldBreak: boolean;
    }
} 