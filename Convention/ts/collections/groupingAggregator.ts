module Convention.Collections {
    export class GroupingAggregator<TIn, TOut> implements IAggregator<TIn, IEnumerable<IGrouping<TIn, TOut>>> {
        private _storage: Grouping<TIn, TOut>[] = [];

        private bucket(item: TIn) {
            var key = this._selector(item);
            var bucket = Enumerable.fromArray(this._storage).firstOrDefault(b => b.key === key);

            if (bucket === null || typeof bucket === "undefined") {
                bucket = new Grouping<TIn, TOut>(key);
                this._storage.push(bucket);
            }

            bucket.add(item);
        }

        aggregate(item: TIn) {
            this.bucket(item);
        }

        getResult(): IEnumerable<IGrouping<TIn, TOut>> {
            return Enumerable.fromArray(this._storage);
        }

        constructor(private _selector: IFunc<TIn, TOut>) {}
    }
} 