 module Convention.Collections {
     export class ArrayEnumerator<TIn> implements IEnumerator<TIn> {
         private _currentIndex: number = 0;

         get current(): TIn {
             return this._accessor(this._currentIndex);
         }

         next(): TIn {
             var next = this.current;

             if (next) {
                 this._currentIndex++;
                 return next;
             }

             return null;
         }

         reset() {
             this._currentIndex = 0;
         }

         constructor(private _accessor: (index: number) => TIn) { }
     }
 }