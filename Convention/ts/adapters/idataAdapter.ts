module Convention.Adapters {
    export interface IDataAdapter {
        create(dataObject: DataObjectBase);
        read(dataObject: DataObjectBase);
    }
} 