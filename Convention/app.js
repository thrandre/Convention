var Convention;
(function (Convention) {
    (function (Observers) {
        (function (Event) {
            Event[Event["PropertyChanged"] = 0] = "PropertyChanged";
            Event[Event["CollectionChanged"] = 1] = "CollectionChanged";
        })(Observers.Event || (Observers.Event = {}));
        var Event = Observers.Event;
    })(Convention.Observers || (Convention.Observers = {}));
    var Observers = Convention.Observers;
})(Convention || (Convention = {}));
var Convention;
(function (Convention) {
    (function (Observers) {
        var EventArgs = (function () {
            function EventArgs(event, data) {
                this.event = event;
                this.data = data;
            }
            return EventArgs;
        })();
        Observers.EventArgs = EventArgs;
    })(Convention.Observers || (Convention.Observers = {}));
    var Observers = Convention.Observers;
})(Convention || (Convention = {}));
var Convention;
(function (Convention) {
    (function (Observers) {
        var PropertyChangedInfo = (function () {
            function PropertyChangedInfo(property) {
                this.segments = [];
                this.segments = this.getPropertySegments(property);
            }
            Object.defineProperty(PropertyChangedInfo.prototype, "path", {
                get: function () {
                    return this.segments.join(".");
                },
                enumerable: true,
                configurable: true
            });

            PropertyChangedInfo.prototype.getPropertySegments = function (property) {
                return property.toString().replace(/\n|\r|\t|\s{2,}/g, "").match(/function \(\) \{return _this\.(.*?);}/)[1].split(".");
            };

            PropertyChangedInfo.prototype.getProperty = function (target) {
                var accessor = target;
                for (var i in this.segments) {
                    accessor = accessor[this.segments[i]];
                }
                return accessor;
            };

            PropertyChangedInfo.prototype.combine = function () {
                var parts = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    parts[_i] = arguments[_i + 0];
                }
                for (var i in parts) {
                    this.segments = this.segments.concat(parts[i].segments);
                }
                return this;
            };
            return PropertyChangedInfo;
        })();
        Observers.PropertyChangedInfo = PropertyChangedInfo;
    })(Convention.Observers || (Convention.Observers = {}));
    var Observers = Convention.Observers;
})(Convention || (Convention = {}));
var Convention;
(function (Convention) {
    (function (Observers) {
        var CollectionChangedInfo = (function () {
            function CollectionChangedInfo(type, item) {
                this.type = type;
                this.item = item;
            }
            return CollectionChangedInfo;
        })();
        Observers.CollectionChangedInfo = CollectionChangedInfo;
    })(Convention.Observers || (Convention.Observers = {}));
    var Observers = Convention.Observers;
})(Convention || (Convention = {}));
///<reference path="eventArgs.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Convention;
(function (Convention) {
    (function (Observers) {
        var PropertyChangedEventArgs = (function (_super) {
            __extends(PropertyChangedEventArgs, _super);
            function PropertyChangedEventArgs(data) {
                _super.call(this, 0 /* PropertyChanged */, data);
            }
            return PropertyChangedEventArgs;
        })(Convention.Observers.EventArgs);
        Observers.PropertyChangedEventArgs = PropertyChangedEventArgs;
    })(Convention.Observers || (Convention.Observers = {}));
    var Observers = Convention.Observers;
})(Convention || (Convention = {}));
///<reference path="eventArgs.ts"/>
var Convention;
(function (Convention) {
    (function (Observers) {
        var CollectionChangedEventArgs = (function (_super) {
            __extends(CollectionChangedEventArgs, _super);
            function CollectionChangedEventArgs(data) {
                _super.call(this, 1 /* CollectionChanged */, data);
            }
            return CollectionChangedEventArgs;
        })(Convention.Observers.EventArgs);
        Observers.CollectionChangedEventArgs = CollectionChangedEventArgs;
    })(Convention.Observers || (Convention.Observers = {}));
    var Observers = Convention.Observers;
})(Convention || (Convention = {}));
var Convention;
(function (Convention) {
    (function (Observers) {
        var ObserverContainer = (function () {
            function ObserverContainer() {
                this._observers = [];
            }
            ObserverContainer.prototype.add = function (observer) {
                var idx = this._observers.indexOf(observer);
                if (idx < 0)
                    this._observers.push(observer);
            };

            ObserverContainer.prototype.remove = function (observer) {
                var idx = this._observers.indexOf(observer);
                if (idx > -1)
                    this._observers.splice(idx, 1);
            };

            ObserverContainer.prototype.notify = function (observable, eventArgs) {
                for (var i in this._observers)
                    this._observers[i](observable, eventArgs);
            };
            return ObserverContainer;
        })();
        Observers.ObserverContainer = ObserverContainer;
    })(Convention.Observers || (Convention.Observers = {}));
    var Observers = Convention.Observers;
})(Convention || (Convention = {}));
var Convention;
(function (Convention) {
    (function (Observers) {
        var Observable = (function () {
            function Observable() {
                this._observerContainer = new Convention.Observers.ObserverContainer();
            }
            Observable.prototype.notifyObservers = function (eventArgs) {
                this._observerContainer.notify(this, eventArgs);
            };

            Observable.prototype.observe = function (observer) {
                this._observerContainer.add(observer);
                return this;
            };
            return Observable;
        })();
        Observers.Observable = Observable;
    })(Convention.Observers || (Convention.Observers = {}));
    var Observers = Convention.Observers;
})(Convention || (Convention = {}));
///<reference path="event.ts"/>
///<reference path="eventArgs.ts"/>
///<reference path="propertyChangedInfo.ts"/>
///<reference path="collectionChangedInfo.ts"/>
///<reference path="propertyChangedEventArgs.ts"/>
///<reference path="collectionChangedEventArgs.ts"/>
///<reference path="observerContainer.ts"/>
///<reference path="observable.ts"/>
///<reference path="../observers/_refs.ts" />
var Convention;
(function (Convention) {
    function property(propertySelf) {
        return new Property(propertySelf);
    }
    Convention.property = property;

    var Property = (function (_super) {
        __extends(Property, _super);
        function Property(propertySelf) {
            _super.call(this);
            this.propertySelf = propertySelf;
        }
        Property.prototype.get = function () {
            return this._value;
        };

        Property.prototype.set = function (value) {
            if (this._value !== value) {
                this._value = value;
                this.notifyObservers(new Convention.Observers.PropertyChangedEventArgs(new Convention.Observers.PropertyChangedInfo(this.propertySelf)));
            }
        };

        Property.prototype.eq = function (value) {
            return this._value === value;
        };

        Property.prototype.gt = function (value) {
            return this._value > value;
        };

        Property.prototype.lt = function (value) {
            return this._value < value;
        };
        return Property;
    })(Convention.Observers.Observable);
    Convention.Property = Property;
})(Convention || (Convention = {}));
var Convention;
(function (Convention) {
    var PatternMatcher = (function () {
        function PatternMatcher(_pattern) {
            this._pattern = _pattern;
        }
        PatternMatcher.prototype.extract = function (str) {
            var match, keys, ret = {};
            console.log(this.rewritePattern(this._pattern));
            keys = this.getKeys(this._pattern);
            match = this.rewritePattern(this._pattern).exec(str);
            for (var i = 1; i < keys.length + 1; i++) {
                ret[keys[i - 1]] = match[i];
            }
            return ret;
        };

        PatternMatcher.prototype.format = function (data) {
            return this._pattern.replace(this.getDefaultRegex(), function () {
                var spl = arguments[2].split("?");
                return data[spl.length > 1 ? spl[1] : spl[0]];
            });
        };

        PatternMatcher.prototype.getDefaultRegex = function () {
            return /\{(\*?(([^\}])+))\}/g;
        };

        PatternMatcher.prototype.getKeys = function (pattern) {
            var re, match, spl, keys = [];
            re = this.getDefaultRegex();
            while ((match = re.exec(pattern))) {
                spl = match[2].split("?");
                keys.push(spl.length > 1 ? spl[1] : spl[0]);
            }
            return keys;
        };

        PatternMatcher.prototype.escape = function (pattern) {
            return pattern.replace(/(\/)/g, "\\$1");
        };

        PatternMatcher.prototype.rewritePattern = function (pattern) {
            return new RegExp(this.escape(pattern).replace(this.getDefaultRegex(), function (_, m) {
                var alphanum = "([A-Za-z0-9]+)";
                if (m.indexOf("?") >= 0) {
                    return "(?:" + m.split("?")[0] + alphanum + ")?";
                }
                if (m.indexOf("*") >= 0) {
                    return "(.+)";
                }
                return alphanum;
            }), "g");
        };

        PatternMatcher.create = function (pattern) {
            return new PatternMatcher(pattern);
        };
        return PatternMatcher;
    })();
    Convention.PatternMatcher = PatternMatcher;
})(Convention || (Convention = {}));
///<reference path="property.ts"/>
///<reference path="patternMatcher.ts" />
var Convention;
(function (Convention) {
    (function (Collections) {
        var Enumerable = (function () {
            function Enumerable() {
            }
            Enumerable.fromArray = function (arr) {
                return new Convention.Collections.EnumerableCore(arr);
            };

            Enumerable.fromObject = function (obj) {
                var pairs = [];
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        pairs.push(new Convention.Tuple(key, obj[key]));
                    }
                }
                return new Convention.Collections.EnumerableCore(pairs);
            };
            return Enumerable;
        })();
        Collections.Enumerable = Enumerable;
    })(Convention.Collections || (Convention.Collections = {}));
    var Collections = Convention.Collections;
})(Convention || (Convention = {}));
var Convention;
(function (Convention) {
    var Tuple = (function () {
        function Tuple(item1, item2) {
            this.item1 = item1;
            this.item2 = item2;
        }
        return Tuple;
    })();
    Convention.Tuple = Tuple;
})(Convention || (Convention = {}));
var Convention;
(function (Convention) {
    (function (SortOrder) {
        SortOrder[SortOrder["Ascending"] = 0] = "Ascending";
        SortOrder[SortOrder["Descending"] = 1] = "Descending";
    })(Convention.SortOrder || (Convention.SortOrder = {}));
    var SortOrder = Convention.SortOrder;
})(Convention || (Convention = {}));
var Convention;
(function (Convention) {
    (function (Collections) {
        var ArrayEnumerator = (function () {
            function ArrayEnumerator(_accessor) {
                this._accessor = _accessor;
                this._currentIndex = 0;
            }
            Object.defineProperty(ArrayEnumerator.prototype, "current", {
                get: function () {
                    return this._accessor(this._currentIndex);
                },
                enumerable: true,
                configurable: true
            });

            ArrayEnumerator.prototype.next = function () {
                var next = this.current;

                if (next) {
                    this._currentIndex++;
                    return next;
                }

                return null;
            };

            ArrayEnumerator.prototype.reset = function () {
                this._currentIndex = 0;
            };
            return ArrayEnumerator;
        })();
        Collections.ArrayEnumerator = ArrayEnumerator;
    })(Convention.Collections || (Convention.Collections = {}));
    var Collections = Convention.Collections;
})(Convention || (Convention = {}));
var Convention;
(function (Convention) {
    (function (Collections) {
        var Iterator = (function () {
            function Iterator(_enumerator) {
                this._enumerator = _enumerator;
            }
            Iterator.prototype.iterate = function (iterator, aggregator) {
                var i = 0;
                var currentItem;

                while ((currentItem = this._enumerator.next()) !== null) {
                    var iteration = iterator(currentItem, i);

                    if (iteration.result !== null) {
                        aggregator.aggregate(iteration.result);
                    }

                    if (iteration.shouldBreak) {
                        break;
                    }

                    i++;
                }

                return aggregator.getResult();
            };

            Iterator.prototype.filter = function (iterator, aggregator) {
                return this.iterate(iterator, aggregator);
            };

            Iterator.prototype.aggregate = function (iterator, aggregator) {
                return this.iterate(iterator, aggregator);
            };
            return Iterator;
        })();
        Collections.Iterator = Iterator;
    })(Convention.Collections || (Convention.Collections = {}));
    var Collections = Convention.Collections;
})(Convention || (Convention = {}));
var Convention;
(function (Convention) {
    (function (Collections) {
        var IterationResult = (function () {
            function IterationResult(result, shouldBreak) {
                this.result = result;
                this.shouldBreak = shouldBreak;
            }
            return IterationResult;
        })();
        Collections.IterationResult = IterationResult;
    })(Convention.Collections || (Convention.Collections = {}));
    var Collections = Convention.Collections;
})(Convention || (Convention = {}));
var Convention;
(function (Convention) {
    (function (Collections) {
        var FilterAggregator = (function () {
            function FilterAggregator() {
                this._storage = [];
            }
            FilterAggregator.prototype.aggregate = function (item) {
                this._storage.push(item);
            };

            FilterAggregator.prototype.getResult = function () {
                return Convention.Collections.Enumerable.fromArray(this._storage);
            };
            return FilterAggregator;
        })();
        Collections.FilterAggregator = FilterAggregator;
    })(Convention.Collections || (Convention.Collections = {}));
    var Collections = Convention.Collections;
})(Convention || (Convention = {}));
var Convention;
(function (Convention) {
    (function (Collections) {
        var AggregationAggregator = (function () {
            function AggregationAggregator(_selector, _aggregatorFunction) {
                this._selector = _selector;
                this._aggregatorFunction = _aggregatorFunction;
            }
            AggregationAggregator.prototype.aggregate = function (item) {
                this._storage = this._aggregatorFunction(this._storage, this._selector(item));
            };

            AggregationAggregator.prototype.getResult = function () {
                return this._storage;
            };
            return AggregationAggregator;
        })();
        Collections.AggregationAggregator = AggregationAggregator;
    })(Convention.Collections || (Convention.Collections = {}));
    var Collections = Convention.Collections;
})(Convention || (Convention = {}));
var Convention;
(function (Convention) {
    (function (Collections) {
        var GroupingAggregator = (function () {
            function GroupingAggregator(_selector) {
                this._selector = _selector;
                this._storage = [];
            }
            GroupingAggregator.prototype.bucket = function (item) {
                var key = this._selector(item);
                var bucket = Convention.Collections.Enumerable.fromArray(this._storage).firstOrDefault(function (b) {
                    return b.key === key;
                });

                if (bucket === null || typeof bucket === "undefined") {
                    bucket = new Convention.Collections.Grouping(key);
                    this._storage.push(bucket);
                }

                bucket.add(item);
            };

            GroupingAggregator.prototype.aggregate = function (item) {
                this.bucket(item);
            };

            GroupingAggregator.prototype.getResult = function () {
                return Convention.Collections.Enumerable.fromArray(this._storage);
            };
            return GroupingAggregator;
        })();
        Collections.GroupingAggregator = GroupingAggregator;
    })(Convention.Collections || (Convention.Collections = {}));
    var Collections = Convention.Collections;
})(Convention || (Convention = {}));
var Convention;
(function (Convention) {
    (function (Collections) {
        var SortingAggregator = (function () {
            function SortingAggregator(_selector, _sortOrder) {
                this._selector = _selector;
                this._sortOrder = _sortOrder;
                this._storage = [];
            }
            SortingAggregator.prototype.getComparer = function () {
                return this._sortOrder === 0 /* Ascending */ ? function (i1, i2) {
                    return i1 > i2;
                } : function (i1, i2) {
                    return i2 > i1;
                };
            };

            SortingAggregator.prototype.getInsertionPosition = function (item1) {
                var _this = this;
                var comparer = this.getComparer();
                var pos = 0;

                Convention.Collections.Enumerable.fromArray(this._storage).firstOrDefault(function (item2) {
                    if (comparer(_this._selector(item1), _this._selector(item2))) {
                        pos++;
                        return false;
                    }
                    return true;
                });

                return pos;
            };

            SortingAggregator.prototype.aggregate = function (item) {
                this._storage.splice(this.getInsertionPosition(item), 0, item);
            };

            SortingAggregator.prototype.getResult = function () {
                return Convention.Collections.Enumerable.fromArray(this._storage);
            };
            return SortingAggregator;
        })();
        Collections.SortingAggregator = SortingAggregator;
    })(Convention.Collections || (Convention.Collections = {}));
    var Collections = Convention.Collections;
})(Convention || (Convention = {}));
///<reference path="../core/tuple.ts"/>
///<reference path="../core/sortOrder.ts" />
///<reference path="arrayEnumerator.ts" />
///<reference path="iterator.ts" />
///<reference path="iterationResult.ts" />
///<reference path="filterAggregator.ts" />
///<reference path="aggregationAggregator.ts" />
///<reference path="groupingAggregator.ts" />
///<reference path="sortingAggregator.ts" />
var Convention;
(function (Convention) {
    (function (Collections) {
        var EnumerableCore = (function () {
            function EnumerableCore(arr) {
                this.storage = arr ? arr : new Array();
            }
            EnumerableCore.prototype.getEnumerator = function () {
                var _this = this;
                return new Convention.Collections.ArrayEnumerator(function (i) {
                    return _this.storage[i];
                });
            };

            EnumerableCore.prototype.aggregate = function (selector, aggFunc) {
                return new Convention.Collections.Iterator(this.getEnumerator()).aggregate(function (i) {
                    return new Convention.Collections.IterationResult(i, false);
                }, new Convention.Collections.AggregationAggregator(selector, aggFunc));
            };

            EnumerableCore.prototype.iterate = function (iterator, aggregator) {
                return new Convention.Collections.Iterator(this.getEnumerator()).filter(iterator, aggregator);
            };

            EnumerableCore.prototype.group = function (iterator, aggregator) {
                return new Convention.Collections.Iterator(this.getEnumerator()).filter(iterator, aggregator);
            };

            EnumerableCore.prototype.filter = function (iterator) {
                return this.iterate(iterator, new Convention.Collections.FilterAggregator());
            };

            EnumerableCore.prototype.sort = function (selector, order) {
                return this.iterate(function (i) {
                    return new Convention.Collections.IterationResult(i, false);
                }, new Convention.Collections.SortingAggregator(selector, order));
            };

            EnumerableCore.prototype.item = function (index) {
                return this.storage[index];
            };

            EnumerableCore.prototype.count = function (predicate) {
                return predicate ? this.where(predicate).count() : this.storage.length;
            };

            EnumerableCore.prototype.where = function (predicate) {
                return this.filter(function (item) {
                    if (predicate(item)) {
                        return new Convention.Collections.IterationResult(item, false);
                    }
                    return new Convention.Collections.IterationResult(null, false);
                });
            };

            EnumerableCore.prototype.firstOrDefault = function (predicate) {
                if (!predicate) {
                    return this.item(0);
                }

                var result = this.filter(function (item, i) {
                    if (predicate(item, i)) {
                        return new Convention.Collections.IterationResult(item, true);
                    }
                    return new Convention.Collections.IterationResult(null, false);
                });

                return result.count() > 0 ? result.firstOrDefault() : null;
            };

            EnumerableCore.prototype.any = function (predicate) {
                return this.firstOrDefault(predicate) !== null;
            };

            EnumerableCore.prototype.select = function (selector) {
                return this.filter(function (item) {
                    return new Convention.Collections.IterationResult(selector(item), false);
                });
            };

            EnumerableCore.prototype.orderByAscending = function (selector) {
                return this.sort(selector, 0 /* Ascending */);
            };

            EnumerableCore.prototype.orderByDescending = function (selector) {
                return this.sort(selector, 1 /* Descending */);
            };

            EnumerableCore.prototype.aggr = function (selector, aggFunc) {
                return this.aggregate(selector, function (sum, next) {
                    return typeof sum === "undefined" ? next : aggFunc(sum, next);
                });
            };

            EnumerableCore.prototype.sum = function (selector) {
                if (!selector)
                    selector = function (i) {
                        return i;
                    };
                return this.aggr(selector, function (sum, next) {
                    return sum + next;
                });
            };

            EnumerableCore.prototype.groupBy = function (selector) {
                return this.group(function (i) {
                    return new Convention.Collections.IterationResult(i, false);
                }, new Convention.Collections.GroupingAggregator(selector));
            };

            EnumerableCore.prototype.each = function (action) {
                return this.filter(function (item) {
                    action(item);
                    return new Convention.Collections.IterationResult(null, false);
                });
            };

            EnumerableCore.prototype.toArray = function () {
                return this.storage.slice(0);
            };

            EnumerableCore.prototype.toList = function () {
                return new Convention.Collections.List(this.toArray());
            };

            EnumerableCore.prototype.serialize = function () {
                return JSON.stringify(this.storage);
            };
            return EnumerableCore;
        })();
        Collections.EnumerableCore = EnumerableCore;
    })(Convention.Collections || (Convention.Collections = {}));
    var Collections = Convention.Collections;
})(Convention || (Convention = {}));
///<reference path="enumerableCore.ts"/>
var Convention;
(function (Convention) {
    (function (Collections) {
        var List = (function (_super) {
            __extends(List, _super);
            function List(arr) {
                _super.call(this, arr);
            }
            List.prototype.add = function (item) {
                this.storage.push(item);
            };

            List.prototype.remove = function (index) {
                this.storage.splice(index, 1);
            };
            return List;
        })(Convention.Collections.EnumerableCore);
        Collections.List = List;
    })(Convention.Collections || (Convention.Collections = {}));
    var Collections = Convention.Collections;
})(Convention || (Convention = {}));
///<reference path="enumerableCore.ts" />
var Convention;
(function (Convention) {
    (function (Collections) {
        var Dictionary = (function (_super) {
            __extends(Dictionary, _super);
            function Dictionary() {
                _super.apply(this, arguments);
            }
            Dictionary.prototype.keyExists = function (key) {
                return Convention.Collections.Enumerable.fromArray(this.storage).any(function (o) {
                    return o.item1 === key;
                });
            };

            Dictionary.prototype.add = function (key, value) {
                if (this.keyExists(key)) {
                    throw new Error("Duplicate key " + key);
                }
                this.storage.push(new Convention.Tuple(key, value));
            };
            return Dictionary;
        })(Convention.Collections.EnumerableCore);
        Collections.Dictionary = Dictionary;
    })(Convention.Collections || (Convention.Collections = {}));
    var Collections = Convention.Collections;
})(Convention || (Convention = {}));
///<reference path="enumerable.ts"/>
///<reference path="list.ts"/>
///<reference path="dictionary.ts"/>
///<reference path="../core/_refs.ts" />
///<reference path="../collections/_refs.ts"/>
var Convention;
(function (Convention) {
    (function (Adapters) {
        var LocalStorageCrudWrapper = (function () {
            function LocalStorageCrudWrapper(_rootName) {
                this._rootName = _rootName;
                this._root = {};
                this.load();
            }
            LocalStorageCrudWrapper.prototype.load = function () {
                var storage = window.localStorage.getItem(this._rootName);
                this._root = storage ? JSON.parse(storage) : {};
            };

            LocalStorageCrudWrapper.prototype.save = function () {
                window.localStorage.setItem(this._rootName, JSON.stringify(this._root));
            };

            LocalStorageCrudWrapper.prototype.entityStore = function (entityName) {
                return this._root[entityName] ? this._root[entityName] : (this._root[entityName] = []);
            };

            LocalStorageCrudWrapper.prototype.create = function (entityName, entityData) {
                this.entityStore(entityName).push(entityData);
                this.save();
            };

            LocalStorageCrudWrapper.prototype.read = function (entityName, id) {
                var store = this.entityStore(entityName);
                if (id) {
                    for (var i in store) {
                        if (store[i].id === id) {
                            return [store[i]];
                        }
                    }
                }
                return store;
            };
            return LocalStorageCrudWrapper;
        })();

        var LocalStorageAdapter = (function () {
            function LocalStorageAdapter() {
                this._wrapper = new LocalStorageCrudWrapper("convention");
            }
            LocalStorageAdapter.prototype.create = function (dataObject) {
                var urlData = Convention.PatternMatcher.create("{?root}/{entity}{/?id}").extract(dataObject.getUrl());
                this._wrapper.create(urlData.entity, dataObject.serialize());
            };

            LocalStorageAdapter.prototype.read = function (dataObject) {
                var urlData = Convention.PatternMatcher.create("{?root}/{entity}{/?id}").extract(dataObject.getUrl());
                var entities = this._wrapper.read(urlData.entity, urlData.id);
                if (dataObject instanceof Convention.Collection) {
                    dataObject.deserialize(entities);
                } else {
                    dataObject.deserialize(entities[0]);
                }
            };
            return LocalStorageAdapter;
        })();
        Adapters.LocalStorageAdapter = LocalStorageAdapter;
    })(Convention.Adapters || (Convention.Adapters = {}));
    var Adapters = Convention.Adapters;
})(Convention || (Convention = {}));
///<reference path="observers/_refs.ts" />
var Convention;
(function (Convention) {
    var ObjectBase = (function (_super) {
        __extends(ObjectBase, _super);
        function ObjectBase() {
            _super.apply(this, arguments);
        }
        ObjectBase.prototype.getClassName = function () {
            return this.constructor.toString().match(/function (.*?)\(/)[1];
        };

        ObjectBase.prototype.getEntityName = function () {
            return this.getClassName().replace(/model|collection|viewmodel/i, "");
        };
        return ObjectBase;
    })(Convention.Observers.Observable);
    Convention.ObjectBase = ObjectBase;

    var DataObjectBase = (function (_super) {
        __extends(DataObjectBase, _super);
        function DataObjectBase() {
            _super.call(this);
            this.propertyMapping = {};
        }
        DataObjectBase.prototype.observeProperties = function () {
            var _this = this;
            for (var p in this) {
                if (this[p] instanceof Convention.Property) {
                    this[p].observe(function (o, e) {
                        return _this.notifyObservers(e);
                    });
                }
            }
        };

        DataObjectBase.prototype.getUrl = function () {
            return Convention.PatternMatcher.create("{root}/{entity}").format({
                root: Convention.Config.current().serverRoot,
                entity: this.getEntityName()
            });
        };

        DataObjectBase.prototype.automap = function (prop, json) {
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
                    toLocal: function (jsonObj) {
                        return jsonObj[found];
                    },
                    toRemote: function (val, jsonObj) {
                        return jsonObj[found] = val;
                    }
                };
                this.propertyMapping = Convention.Utils.extendObject(this.propertyMapping, map);
            }
        };

        DataObjectBase.prototype.serialize = function () {
            var entity = {};
            for (var p in this) {
                if (this[p] instanceof Convention.Property) {
                    if (this.propertyMapping[p]) {
                        this.propertyMapping[p].toRemote(this[p].get(), entity);
                    } else {
                        entity[p] = this[p].get();
                    }
                }
            }
            return entity;
        };

        DataObjectBase.prototype.deserialize = function (entity) {
            for (var p in this) {
                if (this[p] instanceof Convention.Property) {
                    if (!this.propertyMapping[p]) {
                        this.automap(p, entity);
                    }
                    if (this.propertyMapping[p]) {
                        this[p].set(this.propertyMapping[p].toLocal(entity));
                    }
                }
            }
        };
        return DataObjectBase;
    })(ObjectBase);
    Convention.DataObjectBase = DataObjectBase;
})(Convention || (Convention = {}));
///<reference path="core/_refs.ts"/>
///<reference path="objectBase.ts"/>
var Convention;
(function (Convention) {
    var Model = (function (_super) {
        __extends(Model, _super);
        function Model() {
            _super.apply(this, arguments);
            var _this = this;
            this.id = Convention.property(function () {
                return _this.id;
            });
        }
        Model.prototype.getUrl = function () {
            return Convention.PatternMatcher.create("{entity}/{id}").format({
                entity: this.collection ? this.collection.getUrl() : _super.prototype.getUrl.call(this),
                id: this.id.get()
            });
        };
        return Model;
    })(Convention.DataObjectBase);
    Convention.Model = Model;
})(Convention || (Convention = {}));
var Convention;
(function (Convention) {
    var Config = (function () {
        function Config() {
        }
        Config.current = function () {
            return Config._instance ? Config._instance : (Config._instance = new Config());
        };

        Object.defineProperty(Config.prototype, "dataAdapter", {
            get: function () {
                return this._dataAdapter ? this._dataAdapter : (this._dataAdapter = new Convention.Adapters.LocalStorageAdapter());
            },
            set: function (adapter) {
                this._dataAdapter = adapter;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Config.prototype, "serverRoot", {
            get: function () {
                return this._serverRoot ? this._serverRoot : "";
            },
            set: function (root) {
                this._serverRoot = root;
            },
            enumerable: true,
            configurable: true
        });
        Config._instance = null;
        return Config;
    })();
    Convention.Config = Config;
})(Convention || (Convention = {}));
///<reference path="observers/_refs.ts"/>
///<reference path="collections/_refs.ts"/>
///<reference path="model.ts"/>
///<reference path="config.ts"/>
var Collections = Convention.Collections;

var UserModel = (function (_super) {
    __extends(UserModel, _super);
    function UserModel() {
        var _this = this;
        _super.call(this);
        this.name = Convention.property(function () {
            return _this.name;
        });
        this.age = Convention.property(function () {
            return _this.age;
        });
        this.observeProperties();
    }
    return UserModel;
})(Convention.Model);

var UserCollection = (function (_super) {
    __extends(UserCollection, _super);
    function UserCollection() {
        _super.apply(this, arguments);
    }
    return UserCollection;
})(Convention.Collection);

/*
getById(id)
getAll()
get(filter)
add()
remove()
save()
*/
var Repository = (function () {
    function Repository() {
        this.filters = [];
    }
    /*
    filter: {
    property: name,
    comparer: eq,
    comparand: "Thomas"
    or: [filter, filter, filter]
    }
    */
    Repository.prototype.parseComparer = function (comparer) {
        var m = comparer.match(/([a-zA-Z0-9]+)\((.*?)\)/);
        return {
            comparer: m[1],
            comparand: m[2].replace(/"/g, "")
        };
    };

    Repository.prototype.parsePredicate = function (predicate) {
        var parts = predicate.toString().replace(/\n|\r|\t|\s{2,}/g, "").match(/function \(([a-zA-Z0-9]+)\) \{return (.*?);}/)[2].split(".");

        return {
            property: parts[1],
            comparer: this.parseComparer(parts[2])
        };
    };

    Repository.prototype.where = function (predicate) {
        console.log(this.parsePredicate(predicate));
        return this;
    };
    return Repository;
})();

var r = new Repository();
r.where(function (u) {
    return u.name.eq("Thomas");
});
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
///<reference path="core/_refs.ts"/>
///<reference path="objectBase.ts"/>
var Convention;
(function (Convention) {
    var Collection = (function (_super) {
        __extends(Collection, _super);
        function Collection() {
            _super.call(this);
            this.models = new Convention.Collections.List();
        }
        Collection.prototype.getUrl = function () {
            return _super.prototype.getUrl.call(this);
        };

        Collection.prototype.fetch = function () {
            Convention.Config.current().dataAdapter.read(this);
        };

        Collection.prototype.createModel = function () {
            if (!this.model) {
                this.model = window[this.getEntityName() + "Model"];
                if (!this.model)
                    throw new Error("Collection has no associated model.");
            }
            return new this.model();
        };

        Collection.prototype.deserialize = function (entities) {
            for (var i in entities) {
                var entity = this.createModel();
                entity.deserialize(entities[i]);
                entity.collection = this;
                this.models.add(entity);
            }
        };

        Collection.prototype.item = function (index) {
            return this.models.item(index);
        };

        Collection.prototype.add = function (model) {
            this.models.add(model);
        };

        Collection.prototype.remove = function (index) {
            this.models.remove(index);
        };

        Collection.prototype.each = function (action) {
            return this.models.each(action);
        };

        Collection.prototype.getEnumerator = function () {
            return this.models.getEnumerator();
        };

        Collection.prototype.count = function (predicate) {
            return this.models.count(predicate);
        };

        Collection.prototype.where = function (predicate) {
            return this.models.where(predicate);
        };

        Collection.prototype.firstOrDefault = function (predicate) {
            return this.models.firstOrDefault(predicate);
        };

        Collection.prototype.any = function (predicate) {
            return this.models.any(predicate);
        };

        Collection.prototype.select = function (selector) {
            return this.models.select(selector);
        };

        Collection.prototype.orderByAscending = function (selector) {
            return this.models.orderByAscending(selector);
        };

        Collection.prototype.orderByDescending = function (selector) {
            return this.models.orderByDescending(selector);
        };

        Collection.prototype.groupBy = function (selector) {
            return this.models.groupBy(selector);
        };

        Collection.prototype.sum = function (selector) {
            return this.models.sum(selector);
        };

        Collection.prototype.toArray = function () {
            return this.models.toArray();
        };

        Collection.prototype.toList = function () {
            return this.models.toList();
        };
        return Collection;
    })(Convention.DataObjectBase);
    Convention.Collection = Collection;
})(Convention || (Convention = {}));
///<reference path="list.ts"/>
var Convention;
(function (Convention) {
    (function (Collections) {
        var Grouping = (function (_super) {
            __extends(Grouping, _super);
            function Grouping(key) {
                _super.call(this);
                this.key = key;
            }
            return Grouping;
        })(Convention.Collections.List);
        Collections.Grouping = Grouping;
    })(Convention.Collections || (Convention.Collections = {}));
    var Collections = Convention.Collections;
})(Convention || (Convention = {}));
///<reference path="ienumerable.ts"/>
///<reference path="ienumerable.ts"/>
var Convention;
(function (Convention) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.extendObject = function (object) {
            var moreObjects = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                moreObjects[_i] = arguments[_i + 1];
            }
            for (var o in moreObjects) {
                for (var i in moreObjects[o]) {
                    object[i] = moreObjects[o][i];
                }
            }
            return object;
        };
        return Utils;
    })();
    Convention.Utils = Utils;
})(Convention || (Convention = {}));
var Convention;
(function (Convention) {
    (function (Observers) {
        (function (CollectionChangeType) {
            CollectionChangeType[CollectionChangeType["Add"] = 0] = "Add";
            CollectionChangeType[CollectionChangeType["Remove"] = 1] = "Remove";
        })(Observers.CollectionChangeType || (Observers.CollectionChangeType = {}));
        var CollectionChangeType = Observers.CollectionChangeType;
    })(Convention.Observers || (Convention.Observers = {}));
    var Observers = Convention.Observers;
})(Convention || (Convention = {}));
//# sourceMappingURL=app.js.map
