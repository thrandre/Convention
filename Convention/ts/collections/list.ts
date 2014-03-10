///<reference path="enumerableCore.ts"/>

module Convention.Collections {
    export class List<TIn> extends EnumerableCore<TIn> implements IList<TIn> {
        add(item: TIn) {
            this.storage.push(item);
        }

        remove(index: number) {
            this.storage.splice(index, 1);
        }

        constructor(arr?: TIn[]) { super(arr); }
    }
} 