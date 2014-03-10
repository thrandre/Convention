module Convention {
    export interface IPredicate<TIn> {
        (item: TIn, i?: number): boolean;
    }
}