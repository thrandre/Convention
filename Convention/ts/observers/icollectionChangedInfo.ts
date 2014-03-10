module Convention.Observers {
    export interface ICollectionChangedInfo<T> {
        type: CollectionChangeType;
        item: T;
    }
} 