import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
// My
//import { AuthService } from 'src/app/core/services/auth.service';
import { AuthService } from 'src/app/shared/layout/services/auth.service';
import { authorizationRequest } from 'src/app/core/models/authorizationRequest';
import { MenuService } from '../../services/menuService';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    authData: any;
    authorizationRequest!: authorizationRequest;
    //userName:any;
    model: any[] = [];
    items: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>([]);
    menus: MenuItem[] = [];
    counter = 0;
    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private menuService: MenuService
    ) {}
    
    
    async ngOnInit(): Promise<void> {
        console.log('ngOnInit: Başladı');
        await this.initiliazeTokens();
        console.log('ngOnInit: initiliazeTokens Tamamlandı');
       
        await this.createLessonManagementMenu();
        //await this.setMenu();
       // console.log('ngOnInit: setMenu Tamamlandı');
    }
 
     async delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    
      //create a menu from my lessonManagement module
     async createLessonManagementMenu(): Promise<void> {
        console.log('createLessonManagementMenu: Başladı');
        
        const lessonManagementMenu: MenuItem = {
            label: 'Lesson Management',
            icon: 'pi pi-book',
            items: [
                {
                    label: 'Lessons',
                    icon: 'pi pi-address-book',
                    routerLink: ['/lessonManagement/lesson']
                },
                {
                    label: 'Family',
                    icon: 'pi pi-home',
                    routerLink: ['/lessonManagement/family']
                },
                {
                    label: 'Account',
                    icon: 'pi pi-user',
                    routerLink: ['/lessonManagement/account']
                },
                {
                    label: 'Session',
                    icon: 'pi pi-cloud',
                    routerLink: ['/lessonManagement/session']
                },
                {
                    label: 'Student',
                    icon: 'pi pi-users',
                    routerLink: ['/lessonManagement/student']
                },
                {
                    label: 'Teacher',
                    icon: 'pi pi-user-edit',
                    routerLink: ['/lessonManagement/teacher']
                }

                
            ]
        };

        this.menus.push(lessonManagementMenu);
        this.items.next(this.menus);
        console.log('createLessonManagementMenu: Tamamlandı');
    }


    
    // private async getTokens(authorizationRequest: authorizationRequest) {
    //     console.log('getTokens: Başladı');
    //     const tokensObservable = await this.authService.getTokens(authorizationRequest);
    //     tokensObservable.subscribe(
    //         (data) => {
    //             this.authData = data;
    //             console.log('getTokens backend data:'+JSON.stringify(this.authData));
    //             const accessToken = data.data.tokenInfo.accessToken;
    //             const refreshToken = data.data.tokenInfo.refreshToken;
    //             const accessTokenExpiredDate =
    //                 data.data.tokenInfo.accessTokenExpiredDate;
    //             const refreshTokenExpiredDate =
    //                 data.data.tokenInfo.refreshTokenExpiredDate;
    //             const userName = data.data.userName;
     
    //             const currentUser = {
    //                 name: data.adSoyad,
    //                 surname: data.adSoyad,
    //                 title: data.title,
    //             };
    
    //             sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                
    //             sessionStorage.setItem('userName', userName);
    //             sessionStorage.setItem('accessToken', accessToken);
    //             sessionStorage.setItem('refreshToken', refreshToken);
    //             sessionStorage.setItem('accessTokenExpiredDate', accessTokenExpiredDate);
    //             sessionStorage.setItem('refreshTokenExpiredDate', refreshTokenExpiredDate);

    //             console.log( 'sessionStorage->userName =>'+sessionStorage.getItem('userName'));
    //         },
    //         (error) => {
    //             if (error.status === 401) {
    //                 console.log('Unauthorized: Please provide valid credentials.');
    //                 this.messageService.add({
    //                     severity: 'error',
    //                     summary: 'Hata',
    //                     detail: 'Giriş Sayfasına Yönlendiriliyorsunuz',
    //                 });
    //                 sessionStorage.removeItem('accessToken');
    //                 //sessionStorage.clear();
    //                 window.location.href = 'https://yetkiyonetimtest.csgb.gov.tr';
    //             } else {
    //                 console.error('app.menu.component=> getTokens => An error occurred:', error);
    //             }
    //         }
    //     );
    //     console.log('getTokens: Tamamlandı');
    // }

    private async getTokens(authorizationRequest: authorizationRequest) {
        console.log('getTokens: Başladı');
        const tokensObservable = await this.authService.getTokens(authorizationRequest);
        tokensObservable.subscribe(
            (data) => {
                this.authData = data;
                console.log('getTokens backend data:'+JSON.stringify(this.authData));
                const accessToken = data.Token;
                //const refreshToken = data.data.tokenInfo.refreshToken;
                // const accessTokenExpiredDate =
                //     data.data.tokenInfo.accessTokenExpiredDate;
                // const refreshTokenExpiredDate =
                //     data.data.tokenInfo.refreshTokenExpiredDate;
                // const userName = data.data.userName;
     
                const currentUser = {
                    name: data.adSoyad,
                    surname: data.adSoyad,
                    title: data.title,
                };
    
                sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                
                //sessionStorage.setItem('userName', userName);
                sessionStorage.setItem('accessToken', accessToken);
                //sessionStorage.setItem('refreshToken', refreshToken);
               //sessionStorage.setItem('accessTokenExpiredDate', accessTokenExpiredDate);
                //sessionStorage.setItem('refreshTokenExpiredDate', refreshTokenExpiredDate);

                console.log( 'sessionStorage->userName =>'+sessionStorage.getItem('userName'));
                if(this.authData!=null){this.createLessonManagementMenu();}
                
            },
            (error) => {
                if (error.status === 401) {
                    console.log('Unauthorized: Please provide valid credentials.');
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Hata',
                        detail: 'Giriş Sayfasına Yönlendiriliyorsunuz',
                    });
                    sessionStorage.removeItem('accessToken');
                    //sessionStorage.clear();
                    window.location.href = 'https://lessonManagement.tarikonal.com.tr';
                } else {
                    console.error('app.menu.component=> getTokens => An error occurred:', error);
                }
            }
        );
        console.log('getTokens: Tamamlandı');
    }
    
    private async initiliazeTokens(): Promise<void> {
        console.log('initiliazeTokens: Başladı');
    
        await new Promise<void>((resolve, reject) => {
            this.router.events.subscribe((val) => {
                this.route.queryParams.subscribe(async (params) => {
                    // let authCode = params['AuthorizationCode'];
                    // if (!authCode) {
                    //     authCode = '6a6c1759-bbd5-4b04-90e5-3a4bfcc6d2f7';
                    // }
                    if (sessionStorage.getItem('accessToken') === null) {
                       // let refreshToken = sessionStorage.getItem('refreshToken') || '';
    
                        // this.authorizationRequest = new authorizationRequest();
                        // this.authorizationRequest.authorizationCode = authCode;
                        // this.authorizationRequest.refreshToken = refreshToken;
                        // console.log('Auth Request=' + JSON.stringify(this.authorizationRequest));
    
                        try {
                            await this.getTokens(this.authorizationRequest);
                            //await this.delay(4000);
                            console.log('initiliazeTokens: getTokens Tamamlandı');
                        } catch (error) {
                            console.error('Token alma işlemi başarısız:', error);
                            reject(error);
                        }
                    }
                    resolve(); // Tüm asenkron işlemler başarıyla tamamlandı
                });
            });
        });
    
        console.log('initiliazeTokens: Tamamlandı');
    }
    
    
    
}
