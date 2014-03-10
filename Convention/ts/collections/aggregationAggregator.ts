module Convention.Collections {
    export class AggregationAggregator<TIn, TOut> implements IAggregator<TIn, TOut> {
        private _storage: TOut;

        aggregate(item: TIn) {
            this._storage = this._aggregatorFunction(this._storage, this._selector(item));
        }

        getResult(): TOut {
            return this._storage;
        }

        constructor(
            private _selector: IFunc<TIn, TOut>,
            private _aggregatorFunction: IAggregatorFunction<TOut>) { }
    }
} 