module Convention {
    export interface IAction<TIn> {
        (item: TIn, i?: number);
    }
} 