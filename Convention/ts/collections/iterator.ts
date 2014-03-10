module Convention.Collections {
    export class Iterator<TIn> {
        private iterate<TOut, TOut2>(iterator: IIteratorKernel<TIn, TOut>, aggregator: IAggregator<TOut, TOut2>): TOut2 {
            var i = 0;
            var currentItem: TIn;

            while ((currentItem = this._enumerator.next()) !== null) {
                var iteration = iterator(currentItem, i);

                if (iteration.result !== null) {
                    aggregator.aggregate(iteration.result);
                }

                if (iteration.shouldBreak) {
                    break;
                }

                i++;
            }

            return aggregator.getResult();
        }

        filter<TOut, TOut2>(iterator: IIteratorKernel<TIn, TOut>, aggregator: IAggregator<TOut, TOut2>): TOut2 {
            return this.iterate(iterator, aggregator);
        }

        aggregate<TOut, TOut2>(iterator: IIteratorKernel<TIn, TOut>, aggregator: IAggregator<TOut, TOut2>): TOut2 {
            return this.iterate(iterator, aggregator);
        }

        constructor(private _enumerator: IEnumerator<TIn>) { }
    }
} 