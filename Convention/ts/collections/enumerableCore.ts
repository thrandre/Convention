///<reference path="../core/tuple.ts"/>
///<reference path="../core/sortOrder.ts" />
///<reference path="arrayEnumerator.ts" />
///<reference path="iterator.ts" />
///<reference path="iterationResult.ts" />
///<reference path="filterAggregator.ts" />
///<reference path="aggregationAggregator.ts" />
///<reference path="groupingAggregator.ts" />
///<reference path="sortingAggregator.ts" />

module Convention.Collections {
    export class EnumerableCore<TIn> implements IEnumerable<TIn> {
        storage: TIn[];

        getEnumerator(): IEnumerator<TIn> {
            return new ArrayEnumerator((i) => this.storage[i]);
        }

        aggregate<TOut>(selector: IFunc<TIn, TOut>, aggFunc: IAggregatorFunction<TOut>): TOut {
            return new Iterator(this.getEnumerator()).aggregate(i => new IterationResult(i, false), new AggregationAggregator(selector, aggFunc));
        }

        iterate<TOut>(iterator: IIteratorKernel<TIn, TOut>, aggregator: IAggregator<TOut, IEnumerable<TOut>>): IEnumerable<TOut> {
            return new Iterator(this.getEnumerator()).filter(iterator, aggregator);
        }

        group<TOut, TOut2>(iterator: IIteratorKernel<TIn, TOut>, aggregator: IAggregator<TOut, IEnumerable<IGrouping<TIn, TOut2>>>): IEnumerable<IGrouping<TIn, TOut2>> {
            return new Iterator(this.getEnumerator()).filter(iterator, aggregator);
        }

        filter<TOut>(iterator: IIteratorKernel<TIn, TOut>): IEnumerable<TOut> {
            return this.iterate(iterator, new FilterAggregator<TOut>());
        }

        sort<TOut>(selector: IFunc<TIn, TOut>, order: SortOrder): IEnumerable<TIn> {
            return this.iterate(i => new IterationResult(i, false), new SortingAggregator(selector, order));
        }

        item(index: number): TIn {
            return this.storage[index];
        }

        count(predicate?: IPredicate<TIn>): number {
            return predicate ? this.where(predicate).count() : this.storage.length;
        }

        where(predicate: IPredicate<TIn>): IEnumerable<TIn> {
            return this.filter(item => {
                if (predicate(item)) {
                    return new IterationResult(item, false);
                }
                return new IterationResult(null, false);
            });
        }

        firstOrDefault(predicate?: IPredicate<TIn>): TIn {
            if (!predicate) {
                return this.item(0);
            }

            var result = this.filter((item, i) => {
                if (predicate(item, i)) {
                    return new IterationResult(item, true);
                }
                return new IterationResult(null, false);
            });

            return result.count() > 0 ? result.firstOrDefault() : null;
        }

        any(predicate?: IPredicate<TIn>): boolean {
            return this.firstOrDefault(predicate) !== null;
        }

        select<TOut>(selector: IFunc<TIn, TOut>): IEnumerable<TOut> {
            return this.filter(item => {
                return new IterationResult(selector(item), false);
            });
        }

        orderByAscending<TOut>(selector: IFunc<TIn, TOut>): IEnumerable<TIn> {
            return this.sort(selector, SortOrder.Ascending);
        }

        orderByDescending<TOut>(selector: IFunc<TIn, TOut>): IEnumerable<TIn> {
            return this.sort(selector, SortOrder.Descending);
        }

        aggr<TOut>(selector: IFunc<TIn, TOut>, aggFunc: IAggregatorFunction<TOut>): TOut {
            return this.aggregate(selector, (sum, next) => {
                return typeof sum === "undefined" ? next : aggFunc(sum, next);
            });
        }

        sum(selector?: IFunc<TIn, number>): number {
            if (!selector) selector = i => <number><any>i;
            return this.aggr(selector, (sum, next) => sum + next);
        }

        groupBy<TOut>(selector: IFunc<TIn, TOut>): IEnumerable<IGrouping<TIn, TOut>> {
            return this.group(i => new IterationResult(i, false), new GroupingAggregator(selector));
        }

        each(action: IAction<TIn>): IEnumerable<TIn> {
            return this.filter(item => {
                action(item);
                return new IterationResult(null, false);
            });
        }

        toArray(): TIn[] {
            return this.storage.slice(0);
        }

        toList(): IList<TIn> {
            return new List(this.toArray());
        }

        serialize(): string {
            return JSON.stringify(this.storage);
        }

        constructor(arr?: TIn[]) {
            this.storage = arr ? arr : new Array<TIn>();
        }
    }
} 