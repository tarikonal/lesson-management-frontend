import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { catchError, finalize, Observable, pipe, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoaderService } from './loader.service';
import { co } from '@fullcalendar/core/internal-common';
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class InterceptService implements HttpInterceptor {
    constructor(
        private router: Router,
        private messageService: MessageService,
        private loaderService: LoaderService,
        private datepipe: DatePipe
    ) {}

    private compareDates = (d1: string, d2: any): boolean => {
        const date2 = new Date(d2);

        console.log('date2 = ' + date2.toLocaleString());
        console.log('d1 = ' + d1);

        console.log(d1 <= date2.toLocaleString());
        return d1 <= date2.toLocaleString();
        //console.log(`${d1} is less than ${d2}`);

        // } else if (date1 > date2) {
        //     console.log(`${d1} is greater than ${d2}`);
        // } else {
        //     console.log(`Both dates are equal`);
        // }
    };

    private tokenExpired(token: string) {
        // console.log('Token expired = ' +token);
        // const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        // return (Math.floor((new Date).getTime() / 1000)) >= expiry;
        //check the datetime string with current date and time

        console.log('Token expired = ' + token);
        console.log(Math.floor(new Date().getTime() / 1000));
        console.log(Math.floor(new Date(token).getTime() / 1000));
        return (
            Math.floor(new Date().getTime() / 1000) >
            Math.floor(new Date(token).getTime() / 1000)
        );
    }



    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Interceptor çalıştı');
    
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            console.log('Access Token bulundu:', accessToken);
    
            // Token süresinin dolup dolmadığını kontrol et
            const accessTokenExpiredDateStr = localStorage.getItem('accessTokenExpiredDate');
            if (accessTokenExpiredDateStr && this.tokenExpired(accessTokenExpiredDateStr)) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Hata',
                    detail: 'Token süresi dolmuş, giriş yapmanız gerekiyor.',
                });
                this.router.navigate(['/auth/login']);
                return next.handle(req.clone()); // Hangi istek yapıldığını bilmiyorum, orijinal isteği tekrar göndermeye gerek yok
            }
    
            // Token'ı header'a ekle
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + accessToken)
            });
    
            return next.handle(clonedReq).pipe(
                tap({
                    next: (event) => {
                        // Başarılı istek sonrası yapılacak işlemler
                    },
                    error: (error: HttpErrorResponse) => {
                        this.loaderService.setLoading(false);
                        if (error.status === 401) {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Başarısız',
                                detail: 'Giriş Sayfasına Yönlendiriliyorsunuz',
                            });
                            //this.router.navigate(['/auth/login']);
                        } else {
                            // Diğer hata durumlarını ele al
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Başarısız',
                                detail: 'Bir hata meydana geldi',
                            });
                        }
                    },
                    finalize: () => {
                        this.loaderService.setLoading(false);
                    },
                })
            );
        } else {
            console.log('Access Token bulunamadı');
            // Kullanıcı giriş yapmamışsa, istek gönder
            return next.handle(req.clone());
        }
    }
    

    // intercept(
    //     req: HttpRequest<any>,
    //     next: HttpHandler
    // ): Observable<HttpEvent<any>> 
    // {
    //     console.log('intercept metodu çalıştı');
    //     //console.log('intercept.serfvice=>Access Token alınmaya çalışılıyor=' +sessionStorage.getItem('accessToken'));
    //     if (localStorage.getItem('accessToken') != null) {
    //         console.log(
    //             'intercept.service=>Access Token alındı:' +
    //             localStorage.getItem('accessToken')
    //         );

    //         //check if accessToken expired from date time and navigate to error page
    //         const accessTokenExpiredDateStr = localStorage.getItem(
    //             'accessTokenExpiredDate'
    //         );

    //         /*if (sessionStorage.getItem('accessToken') != null) {
    //             //check if accessToken expired from date time and navigate to error page
    //             const refreshTokenExpiredDateStr = sessionStorage.getItem(
    //                 'refreshTokenExpiredDate'
    //             );

    //             if (
    //                 this.compareDates(
    //                     refreshTokenExpiredDateStr?.toString() || '',
    //                     Date.now()
    //                 )
    //             ) {
    //                 console.log('tokenExpired çalıştı');
    //                 this.messageService.add({
    //                     severity: 'error',
    //                     summary: 'Hata',
    //                     detail: 'Giriş Sayfasına Yönlendiriliyorsunuz',
    //                 });
    //                 sessionStorage.removeItem('accessToken');
    //                 sessionStorage.clear();
    //                 //window.location.href =
    //                     //'https://aaaa';
    //                     this.router.navigate(['/']);
    //                 //this.router.navigate(['/auth/login']);
    //                 //this.router.navigateByUrl('https://aaa');
    //             }
    //         }*/

    //         //Spinner componenti çalıştır.
    //         this.loaderService.setLoading(true);
    //         //console.log('intercept.service=>Access Token append edilmeye çalışılıyor=' +sessionStorage.getItem('accessToken'));
    //         const clonedReq = req.clone({
    //             headers: req.headers
    //                 .set(
    //                     'AccessToken',
    //                     'Bearer ' + localStorage.getItem('accessToken')
    //                 )
    //                 // .set(
    //                 //     'RefreshToken',
    //                 //     'Bearer ' + sessionStorage.getItem('refreshToken')
    //                 // ),
    //         });

    //         clonedReq.headers.append('content-type', 'application/json');
    //         return next.handle(clonedReq).pipe(
    //             tap({
    //                 error: (error) => {
    //                     this.loaderService.setLoading(false);
    //                     if (error.status == 401) {
    //                         this.messageService.add({
    //                             severity: 'error',
    //                             summary: 'Başarısız',
    //                             detail: 'Giriş Sayfasına Yönlendiriliyorsunuz',
    //                         });
    //                         //localStorage.removeItem('accessToken');
    //                         //localStorage.clear();
    //                         //    this.router.navigate(['/']);

    //                         // this.router.navigate(['auth/login']);
    //                         return next.handle(req.clone());
    //                     } else if (error.status == 403) {
    //                         this.messageService.add({
    //                             severity: 'error',
    //                             summary: 'Başarısız',
    //                             detail: 'Yetkiniz olmadığı için sayfayı göremezsiniz',
    //                         });
    //                         return next.handle(req.clone());
    //                     } else if (error.status == 400) {
    //                         this.messageService.add({
    //                             severity: 'error',
    //                             summary: 'Başarısız',
    //                             detail: 'Sunucuda bir hata meydana geldi',
    //                         });
    //                         return next.handle(req.clone());
    //                     } else if (error.status == 500) {
    //                         this.messageService.add({
    //                             severity: 'error',
    //                             summary: 'Başarısız',
    //                             detail: 'Sunucuda bir hata meydana geldi',
    //                         });
    //                         return next.handle(req.clone());
    //                     } else {
    //                         // this.router.navigate(['auth/error']);
    //                         return next.handle(req.clone());
    //                     }
    //                 },
    //                 finalize: () => {
    //                     //console.log('intercept.service=>finalize çalıştı=' +sessionStorage.getItem('accessToken'));
    //                     this.loaderService.setLoading(false);
    //                 },
    //             })
    //         );
    //     } else {
    //         // this.router.navigateByUrl('/');

    //         // this.router.navigateByUrl('/auth/login');
    //         return next.handle(req.clone());
    //     }
    // }
}
