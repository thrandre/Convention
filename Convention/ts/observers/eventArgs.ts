module Convention.Observers {
    export class EventArgs implements IEventArgs {
        constructor(public event: Event, public data: any) {}
    }
} 