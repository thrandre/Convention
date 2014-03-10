 module Convention.Observers {
     export class PropertyChangedInfo<T> implements IPropertyChangedInfo<T> {
         segments: string[] = [];

         get path(): string {
             return this.segments.join(".");
         }

         constructor(property: IProperty<T>) {
             this.segments = this.getPropertySegments(property);
         }

         private getPropertySegments(property: IProperty<T>): string[] {
             return property.toString()
                 .replace(/\n|\r|\t|\s{2,}/g, "")
                 .match(/function \(\) \{return _this\.(.*?);}/)[1]
                 .split(".");
         }

         getProperty(target: any): T {
             var accessor = target;
             for (var i in this.segments) {
                 accessor = accessor[this.segments[i]];
             }
             return accessor;
         }

         combine(...parts: IPropertyChangedInfo<T>[]): PropertyChangedInfo<T> {
             for (var i in parts) {
                 this.segments = this.segments.concat(parts[i].segments);
             }
             return this;
         }

     }
 }