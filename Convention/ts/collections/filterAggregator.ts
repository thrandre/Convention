module Convention.Collections {
    export class FilterAggregator<TIn> implements IAggregator<TIn, IEnumerable<TIn>> {
        private _storage: TIn[] = [];

        aggregate(item: TIn) {
            this._storage.push(item);
        }

        getResult(): IEnumerable<TIn> {
            return Enumerable.fromArray(this._storage);
        }
    }
} 