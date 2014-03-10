///<reference path="collections/_refs.ts"/>
///<reference path="model.ts"/>
///<reference path="config.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var User = (function (_super) {
    __extends(User, _super);
    function User() {
        _super.apply(this, arguments);
        this.name = "Thomas";
    }
    return User;
})(Convention.Model);

var PatternMatcher = (function () {
    function PatternMatcher() {
    }
    // User/1 -> {root}/{id}
    // User/Thomas/1 -> {root}/{id}
    PatternMatcher.match = function (str, pattern) {
    };

    PatternMatcher.extract = function (str, pattern) {
        return PatternMatcher.rewritePattern(pattern);
    };

    PatternMatcher.format = function () {
        return "";
    };

    PatternMatcher.getKeys = function (pattern) {
        return pattern.replace("*", "").match(/\{[a-zA-Z0-9]+\}/);
    };

    PatternMatcher.rewritePattern = function (pattern) {
        return pattern.replace(/\{\**([a-zA-Z0-9]+)\}/, function (m) {
            return m.indexOf("*") === 1 ? "(.+)" : "([a-zA-Z0-9]+)";
        });
    };
    return PatternMatcher;
})();
exports.PatternMatcher = PatternMatcher;

var m = new User("1");
var m2 = new User("1");

Convention.Config.current().dataAdapter.create(m);
Convention.Config.current().dataAdapter.read(m2);
//# sourceMappingURL=app.js.map
