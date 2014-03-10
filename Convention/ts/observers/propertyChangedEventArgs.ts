///<reference path="eventArgs.ts"/>

module Convention.Observers {
    export class PropertyChangedEventArgs<T> extends EventArgs {
        constructor(data: IPropertyChangedInfo<T>) { super(Event.PropertyChanged, data); }
    }
} 