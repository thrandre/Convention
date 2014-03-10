module Convention {

    export class Utils {
        static extendObject(object: any, ...moreObjects:any[]): any {
            for (var o in moreObjects) {
                for (var i in moreObjects[o]) {
                    object[i] = moreObjects[o][i];
                }
            }
            return object;
        }
    }
}