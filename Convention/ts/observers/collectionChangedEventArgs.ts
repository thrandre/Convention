///<reference path="eventArgs.ts"/>

module Convention.Observers {
    export class CollectionChangedEventArgs<T> extends EventArgs {
        constructor(data: ICollectionChangedInfo<T>) { super(Event.CollectionChanged, data); }
    }
} 