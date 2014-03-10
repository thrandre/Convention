module Convention.Collections {
    export interface IEnumerable<TIn> {
        getEnumerator: () => IEnumerator<TIn>;
        count: (predicate?: IPredicate<TIn>) => number;
        where: (predicate: IPredicate<TIn>) => IEnumerable<TIn>;
        firstOrDefault: (predicate?: IPredicate<TIn>) => TIn;
        any: (predicate?: IPredicate<TIn>) => boolean;
        select: <TOut>(selector: IFunc<TIn, TOut>) => IEnumerable<TOut>;
        orderByAscending: <TOut>(selector: IFunc<TIn, TOut>) => IEnumerable<TIn>;
        orderByDescending: <TOut>(selector: IFunc<TIn, TOut>) => IEnumerable<TIn>;
        groupBy: <TOut>(selector: IFunc<TIn, TOut>) => IEnumerable<IGrouping<TIn, TOut>>;
        each: (action: IAction<TIn>) => IEnumerable<TIn>;

        sum: (selector?: IFunc<TIn, number>) => number;

        toArray: () => TIn[];
        toList: () => IList<TIn>;
    }
} 