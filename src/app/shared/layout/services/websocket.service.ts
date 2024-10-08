import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class WebSocketService {
    private subject!: Subject<MessageEvent>;

    public connect(url: string): Subject<any> {
        if (!this.subject) {
            this.subject = this.create(url);
        }
        return this.subject;
    }
    private create(url: string): Subject<any> {
        const ws = new WebSocket(url);

        const observable = new Observable((observer: any) => {
            ws.onmessage = observer.next.bind(observer);
            ws.onerror = observer.error.bind(observer);
            ws.onclose = observer.complete.bind(observer);
            return ws.close.bind(ws);
        });

        const observer = {
            next: (data: any) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            },
        };

        return Subject.create(observer, observable);
    }
}
