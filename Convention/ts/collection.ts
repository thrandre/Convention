///<reference path="core/_refs.ts"/>
///<reference path="objectBase.ts"/>

module Convention {
    export class Collection<T> extends DataObjectBase implements Collections.IList<T> {
        model: any;
        models: Collections.IList<T> = new Collections.List<T>();

        constructor() {
            super();
        }

        getUrl(): string {
            return super.getUrl();
        }

        fetch() {
            Config.current().dataAdapter.read(this);
        }

        createModel(): Model<T> {
            if (!this.model) {
                this.model = window[this.getEntityName() + "Model"];
                if (!this.model)
                    throw new Error("Collection has no associated model.");
            }
            return new this.model();
        }

        deserialize(entities: any[]) {
            for (var i in entities) {
                var entity = this.createModel();
                entity.deserialize(entities[i]);
                entity.collection = this;
                this.models.add(<T><any>entity);
            }
        }

        item(index: number): T {
            return this.models.item(index);
        }

        add(model: T) {
            this.models.add(model);
        }

        remove(index: number) {
            this.models.remove(index);
        }

        each(action: IAction<T>): Collections.IEnumerable<T> {
            return this.models.each(action);
        }

        getEnumerator(): Collections.IEnumerator<T> {
            return this.models.getEnumerator();
        }
        
        count(predicate?: IPredicate<T>): number {
            return this.models.count(predicate);
        }

        where(predicate: IPredicate<T>): Collections.IEnumerable<T> {
            return this.models.where(predicate);
        }

        firstOrDefault(predicate?: IPredicate<T>): T {
            return this.models.firstOrDefault(predicate);
        }

        any(predicate?: IPredicate<T>): boolean {
            return this.models.any(predicate);
        }

        select<TOut>(selector: IFunc<T, TOut>): Collections.IEnumerable<TOut> {
            return this.models.select(selector);
        }

        orderByAscending<TOut>(selector: IFunc<T, TOut>): Collections.IEnumerable<T> {
            return this.models.orderByAscending(selector);
        }

        orderByDescending<TOut>(selector: IFunc<T, TOut>): Collections.IEnumerable<T> {
            return this.models.orderByDescending(selector);
        }

        groupBy<TOut>(selector: IFunc<T, TOut>): Collections.IEnumerable<Collections.IGrouping<T, TOut>> {
            return this.models.groupBy(selector);
        }

        sum(selector?: IFunc<T, number>): number {
            return this.models.sum(selector);
        }

        toArray(): T[] {
            return this.models.toArray();
        }

        toList(): Collections.IList<T> {
            return this.models.toList();
        }
    }
} 