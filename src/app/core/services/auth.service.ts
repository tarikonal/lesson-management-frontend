import { Injectable, OnDestroy } from '@angular/core';
import {
    BehaviorSubject,
    catchError,
    finalize,
    Observable,
    of,
    Subscription,
} from 'rxjs';

import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthHTTPService } from './auth-http.service';
import { UserModel } from 'src/app/core/models/user.model';
export type UserType = UserModel | undefined;
@Injectable({
    providedIn: 'root',
})
export class AuthService implements OnDestroy {
    private unsubscribe: Subscription[] = [];
    private authSessionStorageToken = ``;

    currentUser$: Observable<UserType>;
    isLoading$: Observable<boolean>;
    currentUserSubject: BehaviorSubject<UserType>;
    isLoadingSubject: BehaviorSubject<boolean>;

    get currentUserValue(): UserType {
        console.log(this.currentUserSubject.value);
        return this.currentUserSubject.value;
    }
    set currentUserValue(user: UserType) {
        this.currentUserSubject.next(user);
    }

    constructor(
        private authHttpService: AuthHTTPService,
        private router: Router
    ) {
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
        this.currentUser$ = this.currentUserSubject.asObservable();
        this.isLoading$ = this.isLoadingSubject.asObservable();
        const subscr = this.getUserByToken().subscribe();
        this.unsubscribe.push(subscr);
    }

    login(username: string, password: string): Observable<UserType> {
        this.isLoadingSubject.next(true);
        return this.authHttpService.login(username, password).pipe(
            map((response: any) => {
                console.log(response);
                if (response) {
                    sessionStorage.setItem(
                        'currentUser',
                        JSON.stringify(response)
                    );
                    sessionStorage.setItem('token', response.token);
                }
                return response;
            }),
            switchMap(() => this.getUserByToken()),
            catchError((err) => {
                console.error('err', err);
                return of(undefined);
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    logout() {
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('token');

        // this.router.navigate(['/auth/login'], {
        //     queryParams: {},
        // });
    }

    getUserByToken(): Observable<any> {
        const auth = this.getAuthFromSessionStorage();
        if (!auth || !auth.token) {
            return of(undefined);
        }

        this.isLoadingSubject.next(true);
        return this.authHttpService.getUserByToken(auth).pipe(
            map((user: any) => {
                if (user) {
                    this.currentUserSubject.next(user);
                } else {
                    this.logout();
                }
                return user;
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    private getAuthFromSessionStorage(): any | undefined {
        try {
            const lsValue = sessionStorage.getItem('currentUser');
            if (!lsValue) {
                return undefined;
            }

            const authData = JSON.parse(lsValue);
            return authData;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    ngOnDestroy(): void {}
}
