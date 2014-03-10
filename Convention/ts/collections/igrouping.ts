///<reference path="ienumerable.ts"/>

module Convention.Collections {
    export interface IGrouping<TIn, TOut> extends IEnumerable<TIn> {
        key: TOut;
    }
} 