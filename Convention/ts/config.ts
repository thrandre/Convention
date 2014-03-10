module Convention {
    export class Config {
        static _instance: Config = null;
        static current(): Config {
            return Config._instance ? Config._instance : (Config._instance = new Config());
        }

        private _dataAdapter: Adapters.IDataAdapter;
        get dataAdapter(): Adapters.IDataAdapter {
            return this._dataAdapter ? this._dataAdapter : (this._dataAdapter = new Adapters.LocalStorageAdapter());
        }
        set dataAdapter(adapter: Adapters.IDataAdapter) {
            this._dataAdapter = adapter;
        }

        private _serverRoot: string;
        get serverRoot(): string {
            return this._serverRoot ? this._serverRoot : "";
        }
        set serverRoot(root: string) {
            this._serverRoot = root;
        }
    }
} 