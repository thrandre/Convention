///<reference path="ienumerable.ts"/>

module Convention.Collections {
    export interface IList<TIn> extends IEnumerable<TIn> {
        add: (item: TIn) => void;
        item: (index: number) => TIn;
        remove: (index: number) => void;
    }
} 