///<reference path="../core/_refs.ts" />
///<reference path="../collections/_refs.ts"/>

module Convention.Adapters {
    class LocalStorageCrudWrapper {
        private _root: any = {};

        constructor(private _rootName: string) {
            this.load();
        }

        private load() {
            var storage = window.localStorage.getItem(this._rootName);
            this._root = storage ? JSON.parse(storage) : {};
        }

        private save() {
            window.localStorage.setItem(this._rootName, JSON.stringify(this._root));
        }

        private entityStore(entityName: string) {
            return this._root[entityName] ? this._root[entityName] : (this._root[entityName] = []);
        }

        create(entityName: string, entityData: any) {
            this.entityStore(entityName).push(entityData);
            this.save();
        }

        read(entityName: string, id?: string): any[] {
            var store = this.entityStore(entityName);
            if (id) {
                for (var i in store) {
                    if (store[i].id === id) {
                        return [store[i]];
                    }
                }
            }
            return store;
        }
    }

    export class LocalStorageAdapter implements IDataAdapter {
        private _wrapper = new LocalStorageCrudWrapper("convention");

        create(dataObject: DataObjectBase) {
            var urlData = PatternMatcher.create("{?root}/{entity}{/?id}").extract(dataObject.getUrl());
            this._wrapper.create(urlData.entity, dataObject.serialize());
        }

        read<T>(dataObject: DataObjectBase) {
            var urlData = PatternMatcher.create("{?root}/{entity}{/?id}").extract(dataObject.getUrl());
            var entities = this._wrapper.read(urlData.entity, urlData.id);
            if (dataObject instanceof Collection) {
                dataObject.deserialize(entities);
            } else {
                dataObject.deserialize(entities[0]);
            }
        }
     }
 }