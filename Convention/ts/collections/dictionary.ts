///<reference path="enumerableCore.ts" />

module Convention.Collections {
    export class Dictionary<TKey, TVal> extends EnumerableCore<Tuple<TKey, TVal>> {
        keyExists(key: TKey): boolean {
            return Enumerable.fromArray(this.storage).any(o=> o.item1 === key);
        }

        add(key: TKey, value: TVal) {
            if (this.keyExists(key)) {
                throw new Error("Duplicate key " + key);
            }
            this.storage.push(new Tuple(key, value));
        }


    }
} 