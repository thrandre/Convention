///<reference path="observers/_refs.ts"/>
///<reference path="collections/_refs.ts"/>

///<reference path="model.ts"/>
///<reference path="config.ts"/>

import Collections = Convention.Collections;

class UserModel extends Convention.Model<UserModel> {
    name = Convention.property<string>(() => this.name);
    age = Convention.property<number>(() => this.age);

    constructor() {
        super();
        this.observeProperties();
    }
}

class UserCollection extends Convention.Collection<UserModel> { }

/*
    getById(id)
    getAll()
    get(filter)
    add()
    remove()
    save()
*/

class Repository<T> {
    public filters = [];

    /*
        filter: {
            property: name,
            comparer: eq,
            comparand: "Thomas"
            or: [filter, filter, filter]
        }
    */

    parseComparer(comparer: string) {
        var m = comparer.match(/([a-zA-Z0-9]+)\((.*?)\)/);
        return {
            comparer: m[1],
            comparand: m[2].replace(/"/g, "")
        };
    }

    parsePredicate(predicate: Convention.IPredicate<T>) {
        var parts = predicate.toString()
            .replace(/\n|\r|\t|\s{2,}/g, "")
            .match(/function \(([a-zA-Z0-9]+)\) \{return (.*?);}/)[2]
            .split(".");

        return {
            property: parts[1],
            comparer: this.parseComparer(parts[2])
        };
    }

    where(predicate: Convention.IPredicate<T>): Repository<T> {
        console.log(this.parsePredicate(predicate));
        return this;
    }
}

var r = new Repository<UserModel>();
r.where(u=> u.name.eq("Thomas"));

//                                comparer             skip    limit
// UserRepository.where(u => u.name.equals("Thomas")).skip(5).take(10); => UserCollection.fetch({ u.id:  });

// [{ property: name, comparer: eq, comparand: "Thomas" }]

/*u.propertyMapping = Convention.Utils.extendObject(u.propertyMapping, {
    id: {
        toLocal: (json)=> json.Id,
        toRemote: (val, json)=> json.Id = parseInt(val)    
    }
});*/

/*u.observe((o, args)=> {
    if(args.event === Convention.Observers.Event.PropertyChanged) {
        var propInfo = <Convention.Observers.PropertyChangedInfo<any>> args.data;
        console.log(propInfo.getProperty(o).get());
    }
});

u.id.set("2");*/