module Convention.Observers {
    export class CollectionChangedInfo<T> implements ICollectionChangedInfo<T> {
        constructor(public type: CollectionChangeType, public item: T) { }
    }
} 