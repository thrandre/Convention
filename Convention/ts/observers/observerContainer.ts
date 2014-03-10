module Convention.Observers {
    export class ObserverContainer {
        private _observers: IObserver[] = [];

        add(observer: IObserver) {
            var idx = this._observers.indexOf(observer);
            if (idx < 0) this._observers.push(observer);
        }

        remove(observer: IObserver) {
            var idx = this._observers.indexOf(observer);
            if (idx > -1) this._observers.splice(idx, 1);
        }

        notify(observable: Observable, eventArgs: EventArgs) {
            for (var i in this._observers)
                this._observers[i](observable, eventArgs);
        }
    }
} 