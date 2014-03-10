 module Convention.Collections {
     export interface IEnumerator<TIn> {
         current: TIn;
         next: () => TIn;
         reset: () => void;
     }
 }