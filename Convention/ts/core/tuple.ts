﻿module Convention {
    export class Tuple<T1, T2> implements ITuple<T1, T2> {
        constructor(public item1: T1, public item2: T2) {}
    }
} 