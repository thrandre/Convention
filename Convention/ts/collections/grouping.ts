///<reference path="list.ts"/>

module Convention.Collections {
    export class Grouping<TIn, TOut> extends List<TIn> implements IGrouping<TIn, TOut> {
        constructor(public key: TOut) {
            super();
        }
    }
} 