import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AuthModel } from '../models/auth.model';

const API_USERS_URL = `${environment.backendUrl}authentication/login`;

@Injectable({
    providedIn: 'root',
})
export class AuthHTTPService {
    constructor(private http: HttpClient) {}

    // public methods
    login(username: string, password: string): Observable<any> {
        return this.http.post<AuthModel>(`${API_USERS_URL}`, {
            username,
            password,
        });
    }

    getUserByToken(token: string): Observable<any | undefined> {
        // const user = UsersTable.users.find((u: UserModel) => {
        //   return u.authToken === token;
        // });

        const user = sessionStorage.getItem('currentUser');

        if (!user) {
            return of(undefined);
        }

        return of(user);
    }
}
