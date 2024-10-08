import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// My
import { ControllerDataService } from './api/controller-data.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService extends ControllerDataService {
    constructor(http: HttpClient) {
        super(http);
        this.setControllerName("Account"); // Burayı değiştir.
    }

    // Auth Token bilgilerini getir. 
    async getTokens(options?: any): Promise<Observable<any>> {
        options = {
            ...options,
            Username: 'tarikonal',
            Password: '06@Besiktas'
        };
        return await this.post(this.getControllerName() + 'login', options);
    }
}
