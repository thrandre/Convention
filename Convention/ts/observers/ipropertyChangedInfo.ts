module Convention.Observers {
    export interface IPropertyChangedInfo<T> {
        segments: string[];
        path: string;
        getProperty(target: any): any;
    }
} 