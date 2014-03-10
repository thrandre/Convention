///<reference path="observers/_refs.ts" />

module Convention {
    export class ObjectBase extends Observers.Observable {
        private getClassName(): string {
            return this.constructor
                .toString()
                .match(/function (.*?)\(/)[1];
        }

        getEntityName(): string {
            return this.getClassName()
                .replace(/model|collection|viewmodel/i, "");
        }
    }

    export interface IPropertyMapping {
        toLocal: (json: any) => any;
        toRemote: (val: any, json: any) => void;
    }

    export class DataObjectBase extends ObjectBase {
        propertyMapping: {[id:string]: IPropertyMapping} = {};

        constructor() {
            super();
        }

        observeProperties() {
            for (var p in this) {
                if (this[p] instanceof Property) {
                    (<Property<any>> this[p]).observe((o, e)=> this.notifyObservers(e));
                }
            }
        }

        getUrl(): string {
            return PatternMatcher
                .create("{root}/{entity}")
                .format({
                    root: Config.current().serverRoot,
                    entity: this.getEntityName()
                });
        }

        automap(prop: string, json: any) {
            var found, map = {};
            for (var jsonProp in json) {
                if (json.hasOwnProperty(jsonProp)) {
                    if (jsonProp.toLowerCase() === prop.toLowerCase()) {
                        found = jsonProp;
                    }
                }
            }
            if (found) {
                map[prop] = {
                    toLocal: (jsonObj) => jsonObj[found],
                    toRemote: (val, jsonObj) => jsonObj[found] = val
                };
                this.propertyMapping = Utils.extendObject(this.propertyMapping, map);
            }
        }

        serialize(): any {
            var entity = {};
            for (var p in this) {
                if (this[p] instanceof Property) {
                    if (this.propertyMapping[p]) {
                        this.propertyMapping[p].toRemote(this[p].get(), entity);
                    } else {
                        entity[p] = this[p].get();
                    }
                }
            }
            return entity;
        }

        deserialize(entity: any) {
            for (var p in this) {
                if (this[p] instanceof Property) {
                    if (!this.propertyMapping[p]) {
                        this.automap(p, entity);
                    }
                    if (this.propertyMapping[p]) {
                        this[p].set(this.propertyMapping[p].toLocal(entity));
                    }
                }
            }
        }
    }
}