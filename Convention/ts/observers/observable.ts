module Convention.Observers {
    export class Observable {
        private _observerContainer = new ObserverContainer();

        notifyObservers(eventArgs: EventArgs) {
            this._observerContainer.notify(this, eventArgs);
        }

        observe(observer: IObserver): Observable {
            this._observerContainer.add(observer);
            return this;
        }
    }
} 