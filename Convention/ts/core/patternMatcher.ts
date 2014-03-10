module Convention {
    export class PatternMatcher {
        constructor(private _pattern: string) { }

        extract(str: string): any {
            var match, keys, ret = {};
            console.log(this.rewritePattern(this._pattern));
            keys = this.getKeys(this._pattern);
            match = this.rewritePattern(this._pattern).exec(str);
            for (var i = 1; i < keys.length+1; i++) {
                ret[keys[i - 1]] = match[i];
            }
            return ret;
        }

        format(data: any): string {
            return this._pattern.replace(this.getDefaultRegex(), ()=> {
                var spl = arguments[2].split("?");
                return data[spl.length > 1 ? spl[1] : spl[0]];
            });
        }

        private getDefaultRegex(): RegExp {
            return /\{(\*?(([^\}])+))\}/g;
        }

        private getKeys(pattern: string): string[] {
            var re, match, spl, keys = [];
            re = this.getDefaultRegex();
            while ((match = re.exec(pattern))) {
                spl = match[2].split("?");
                keys.push(spl.length > 1 ? spl[1] : spl[0]);
            }
            return keys;
        }

        private escape(pattern: string): string {
            return pattern.replace(/(\/)/g, "\\$1");
        }

        private rewritePattern(pattern: string): RegExp {
            return new RegExp(
                this.escape(pattern)
                    .replace(this.getDefaultRegex(), (_, m) => {
                        var alphanum = "([A-Za-z0-9]+)";
                        if (m.indexOf("?") >= 0) {
                            return "(?:" + m.split("?")[0] + alphanum + ")?";
                        }
                        if (m.indexOf("*") >= 0) {
                            return "(.+)";
                        }
                        return alphanum;
                    }), "g");
        }

        static create(pattern: string): PatternMatcher {
            return new PatternMatcher(pattern);
        }
    }
} 