/// <reference path="observer/_refs.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
exports.ObjectBase = ObjectBase;

var Model = (function (_super) {
    __extends(Model, _super);
    function Model() {
        _super.apply(this, arguments);
    }
    Model.prototype.getUrl = function () {
        return "";
    };

    Model.prototype.serialize = function (model) {
        return "";
    };

    Model.prototype.deserialize = function (serialized) {
        return null;
    };
    return Model;
})(ConventionBase);
exports.Model = Model;
//# sourceMappingURL=collection.js.map
