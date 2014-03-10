module Convention.Observers {
    export interface IObserver {
        (observable: Observable, eventArgs: EventArgs);
    }
} 