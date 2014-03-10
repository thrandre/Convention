module Convention {
    export interface IComparer<TIn> {
        (item1: TIn, item2: TIn): boolean;
    }
} 