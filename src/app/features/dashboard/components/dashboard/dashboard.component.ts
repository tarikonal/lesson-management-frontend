// Core
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
// Theme
import { MessageService } from 'primeng/api';
// My
import { CurrentUser } from 'src/app/core/models/current-user.model';
import { LayoutService } from 'src/app/shared/layout/services/app.layout.service';
import { authorizationRequest } from 'src/app/core/models/authorizationRequest';
//import { BarChartDto } from 'src/app/features/strateji/models/BarChartDto';
//import { GraphsService } from 'src/app/features/strateji/services/graphs.service';
import { AuthService } from 'src/app/shared/layout/services/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    userInfo!: CurrentUser;
    counter = 0;
    userInput: string = '';
    messages: { text: string; sender: string }[] = [];
    //isOpen: boolean = false; // Chat penceresinin açık/kapalı durumunu tutar
    userMessage: string = '';
    botReply: string = '';

    authorizationRequest!: authorizationRequest;
    lineData: any;

    barData: any;

    pieData: any;

    polarData: any;

    radarData: any;

    lineOptions: any;

    barOptions: any;

    pieOptions: any;

    polarOptions: any;

    radarOptions: any;

    subscription: Subscription;

    //public graphData!: BarChartDto;
    authData: any;

    constructor(
        public layoutService: LayoutService,
        //private graphsService: GraphsService,
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService,
        //private chatService: ChatService,
        private route: ActivatedRoute
    ) {
        this.subscription = this.layoutService.configUpdate$.subscribe(
            (config) => {
                this.initCharts();
            }
        );
    }

    // ngAfterViewInit() {
    //     console.log('ngAfterViewInit çağrıldı');
    //     console.log(
    //         'ngAfterViewInit-accessToken: ' +
    //             sessionStorage.getItem('accessToken')
    //     );
    //     if (sessionStorage.getItem('accessToken') !== null) {
    //         this.initCharts();
    //     }
    // }
    ngOnInit() {
    
    // console.log("Dasboard çalıştı");
    //     let authCode;
    //     this.router.events.subscribe((val) => {
     
    //         this.route.queryParams.subscribe((params) => {
    //             authCode = params['AuthorizationCode'];
    //             //console.log("auth code ="+authCode); // Print the parameter to the console.

    //             // if (!authCode) {
    //             //     authCode = '106b8602-295b-42cd-9a82-b1fba3243151';
    //             // }
    //             if (sessionStorage.getItem('accessToken') === null) {
    //                 var refreshToken = sessionStorage.getItem('refreshToken');

    //                 if (!refreshToken) {
    //                     //refreshToken = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJrdWxsYW5pY2lJZCI6IjEyMCIsImFkU295YWQiOiJUYXLEsWsgw5ZOQUwiLCJlbWFpbCI6InRhcmlrLm9uYWxAY3NnYi5nb3YudHIiLCJrdWxsYW5pY2lBZGkiOiJ0YXJpay5vbmFsIiwieWV0a2kiOiJbXSIsIm5iZiI6MTcxNzA1MzIxMSwiZXhwIjoxNzE3MDU1MDExLCJpc3MiOiJDU0dCIiwiYXVkIjoiQ1NHQiJ9.7EuZ_nvIyLX0JdXFlOdP_atLboWFJ7Zau2-e7XHJD97u1Lkgt0ewk6vqremw7MRT4oy-Mfn48pqeJbcUQt7r9Q';
    //                     refreshToken = '';
    //                 }
    //                 this.authorizationRequest = new authorizationRequest();
    //                 this.authorizationRequest.authorizationCode = authCode;
    //                 this.authorizationRequest.refreshToken = refreshToken;
    //                 console.log(
    //                     'Auth Request=' +
    //                         JSON.stringify(this.authorizationRequest)
    //                 );
    //                 this.getTokens(this.authorizationRequest);
    //                 console.log('ngOnInit' + this.counter + ' defa çağrıldı');

    //                 this.counter++;
    //             }
    //         });
    //     });

        this.initCharts();
        //link deki parametreleri sil
        if (window.location.href.includes('AuthorizationCode')) {
            const url = new URL(window.location.href);
            url.searchParams.delete('AuthorizationCode');
            window.history.replaceState(
                {},
                document.title,
                url.pathname + url.search
            );
        }
    }



    // getTokens(authorizationRequest: authorizationRequest) {
    //     this.authService.getTokens(authorizationRequest).subscribe(
    //         (data) => {
    //             this.authData = data;
    //             console.log(JSON.stringify(this.authData));
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

    //             // Store currentUser object in session storage
    //             sessionStorage.setItem(
    //                 'currentUser',
    //                 JSON.stringify(currentUser)
    //             );

    //             console.log(JSON.stringify('username=' + userName));
    //             sessionStorage.setItem('userName', userName);
    //             sessionStorage.setItem('accessToken', accessToken);
    //             sessionStorage.setItem('refreshToken', refreshToken);
    //             sessionStorage.setItem(
    //                 'accessTokenExpiredDate',
    //                 accessTokenExpiredDate
    //             );
    //             sessionStorage.setItem(
    //                 'refreshTokenExpiredDate',
    //                 refreshTokenExpiredDate
    //             );
    //         },
    //         (error) => {
    //             if (error.status === 401) {
    //                 // Display error message for 401 status code
    //                 console.log(
    //                     'Unauthorized: Please provide valid credentials.'
    //                 );
    //                 this.messageService.add({
    //                     severity: 'error',
    //                     summary: 'Hata',
    //                     detail: 'Giriş Sayfasına Yönlendiriliyorsunuz',
    //                 });
    //                 sessionStorage.removeItem('accessToken');
    //                 sessionStorage.clear();
    //                 window.location.href =
    //                     'https://yetkiyonetimtest.csgb.gov.tr';
    //             } else {
    //                 // Handle other error cases
    //                 console.error('An error occurred:', error);
    //             }
    //         }
    //     );
    // }

    initCharts() {
        // this.graphsService
        //     .getAmaclarinGerceklesmeYuzdeleri()
        //     .subscribe((data) => {
        //         //this.graphData = data;
        //         this.barData = data;
        //         // console.log(this.barData);
        //         if (this.graphData && this.graphData.labels) {
        //             //console.log(this.graphData.labels);
        //         } else {
        //             //console.log('No labels found in graphData');
        //         }
        //     });
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');

        // if (this.graphData) {
        //     this.barData = {
        //         labels: this.graphData.labels,// ['Amaç1', 'Amaç2', 'Amaç3', 'Amaç4', 'Amaç5'],
        //
        //         datasets: [
        //             {
        //                 label: this.graphData.datasets[0].label,// 'Amaçların 2024 Yılı Gerçekleşme Yüzdeleri',
        //                 backgroundColor: documentStyle.getPropertyValue('--primary-500'),
        //                 borderColor: documentStyle.getPropertyValue('--primary-500'),
        //                 data: this.graphData.datasets[0].data// [36.29,0,31.17,41.39,45.75]
        //             },
        //         ]
        //     };
        // } else {
        //     console.log('No graphData found');
        //     console.log(this.graphData);
        // }

        this.barOptions = {
            indexAxis: 'y',
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500,
                        },
                    },
                    grid: {
                        display: true,
                        drawBorder: true,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: true,
                    },
                },
            },
        };

        this.pieData = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--teal-500'),
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--indigo-400'),
                        documentStyle.getPropertyValue('--purple-400'),
                        documentStyle.getPropertyValue('--teal-400'),
                    ],
                },
            ],
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor,
                    },
                },
            },
        };

        this.lineData = {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
            ],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--primary-500'),
                    borderColor:
                        documentStyle.getPropertyValue('--primary-500'),
                    tension: 0.4,
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--primary-200'),
                    borderColor:
                        documentStyle.getPropertyValue('--primary-200'),
                    tension: 0.4,
                },
            ],
        };

        this.lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
            },
        };

        this.polarData = {
            datasets: [
                {
                    data: [11, 16, 7, 3],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--teal-500'),
                        documentStyle.getPropertyValue('--orange-500'),
                    ],
                    label: 'My dataset',
                },
            ],
            labels: ['Indigo', 'Purple', 'Teal', 'Orange'],
        };

        this.polarOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                r: {
                    grid: {
                        color: surfaceBorder,
                    },
                },
            },
        };

        this.radarData = {
            labels: [
                'Eating',
                'Drinking',
                'Sleeping',
                'Designing',
                'Coding',
                'Cycling',
                'Running',
            ],
            datasets: [
                {
                    label: 'My First dataset',
                    borderColor: documentStyle.getPropertyValue('--indigo-400'),
                    pointBackgroundColor:
                        documentStyle.getPropertyValue('--indigo-400'),
                    pointBorderColor:
                        documentStyle.getPropertyValue('--indigo-400'),
                    pointHoverBackgroundColor: textColor,
                    pointHoverBorderColor:
                        documentStyle.getPropertyValue('--indigo-400'),
                    data: [65, 59, 90, 81, 56, 55, 40],
                },
                {
                    label: 'My Second dataset',
                    borderColor: documentStyle.getPropertyValue('--purple-400'),
                    pointBackgroundColor:
                        documentStyle.getPropertyValue('--purple-400'),
                    pointBorderColor:
                        documentStyle.getPropertyValue('--purple-400'),
                    pointHoverBackgroundColor: textColor,
                    pointHoverBorderColor:
                        documentStyle.getPropertyValue('--purple-400'),
                    data: [28, 48, 40, 19, 96, 27, 100],
                },
            ],
        };

        this.radarOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor,
                    },
                },
            },
            scales: {
                r: {
                    grid: {
                        color: textColorSecondary,
                    },
                },
            },
        };
    }

    ngOnDestroy() {        
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    // getGraphs() {
    //     this.graphsService.getGraphs().subscribe(data => {
    //         this.graphData = data;
    //         console.log(this.graphData);
    //     })
    // }
}
