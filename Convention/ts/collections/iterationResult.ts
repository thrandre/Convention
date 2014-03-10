module Convention.Collections {
    export class IterationResult<TIn> implements IIterationResult<TIn> {
        constructor(public result: TIn, public shouldBreak: boolean) { }
    }
} 