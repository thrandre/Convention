///<reference path="../observers/_refs.ts" />

module Convention {
    export function property<T>(propertySelf?: IProperty<T>) {
        return new Property<T>(propertySelf);
    }

    export class Property<T> extends Observers.Observable {
        private _value: T;

        constructor(private propertySelf?: IProperty<T>) { super(); }

        get(): T {
            return this._value;
        }

        set(value: T) {
            if (this._value !== value) {
                this._value = value;
                this.notifyObservers(
                    new Observers.PropertyChangedEventArgs(
                        new Observers.PropertyChangedInfo(this.propertySelf)));
            }
        }

        eq(value: T): boolean {
            return this._value === value;
        }

        gt(value: T): boolean {
            return this._value > value;
        }

        lt(value: T): boolean {
            return this._value < value;
        }
    }
}