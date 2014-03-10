module Convention.Collections {
    export class Enumerable {
        static fromArray<T>(arr: T[]): IEnumerable<T> {
            return new EnumerableCore(arr);
        }

        static fromObject<TVal>(obj: { [id: string]: TVal }): IEnumerable<ITuple<string, TVal>> {
            var pairs: ITuple<string, TVal>[] = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    pairs.push(new Tuple(key, obj[key]));
                }
            }
            return new EnumerableCore(pairs);
        }
    }
} 