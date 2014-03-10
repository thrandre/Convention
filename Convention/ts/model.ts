///<reference path="core/_refs.ts"/>
///<reference path="objectBase.ts"/>

module Convention {
    export class Model<T> extends DataObjectBase {
        id = property<string>(()=> this.id);
        collection: Collection<T>;

        getUrl(): string {
            return PatternMatcher.create("{entity}/{id}").format({
                entity: this.collection ? this.collection.getUrl() : super.getUrl(),
                id: this.id.get()
            });
        }
    }
} 