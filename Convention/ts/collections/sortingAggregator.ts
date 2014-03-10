module Convention.Collections {
    export class SortingAggregator<TIn, TOut> implements IAggregator<TIn, IEnumerable<TIn>> {
        private _storage: TIn[] = [];

        private getComparer(): IComparer<TOut> {
            return this._sortOrder === SortOrder.Ascending
                ? (i1, i2) => i1 > i2
                : (i1, i2) => i2 > i1;
        }

        private getInsertionPosition(item1: TIn): number {
            var comparer = this.getComparer();
            var pos = 0;

            Enumerable.fromArray(this._storage).firstOrDefault(item2=> {
                if (comparer(this._selector(item1), this._selector(item2))) {
                    pos++;
                    return false;
                }
                return true;
            });

            return pos;
        }

        aggregate(item: TIn) {
            this._storage.splice(this.getInsertionPosition(item), 0, item);
        }

        getResult(): IEnumerable<TIn> {
            return Enumerable.fromArray(this._storage);
        }

        constructor(
            private _selector: IFunc<TIn, TOut>,
            private _sortOrder: SortOrder) { }
    }
} 