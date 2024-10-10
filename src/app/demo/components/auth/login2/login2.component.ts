import { Component } from '@angular/core';
import { LayoutService } from 'src/app/shared/layout/services/app.layout.service';
import { AuthService } from 'src/app/shared/layout/services/auth.service';
//import { LoginDto } from '../../../../src/app/features/lessonManagement/models/LoginDto';
import { LoginDto } from 'src/app/shared/layout/models/loginDto';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from "primeng/api";
import { DatePipe } from "@angular/common";
import { Router } from '@angular/router';


@Component({
	templateUrl: './login2.component.html',
	providers: [MessageService, ConfirmationService, DatePipe],
})
export class Login2Component  {
	authData: any;
	loginDto: LoginDto;
	loginForm: FormGroup | undefined;
	constructor(
		private authService: AuthService,
		private layoutService: LayoutService,
		private formBuilder: FormBuilder,
		private router: Router,
        private messageService: MessageService
        ) 
	{
		this.loginDto = new LoginDto();
	}

	rememberMe: boolean = false;
    ngOnInit(): void {
    
    }
    get dark(): boolean {
        return this.layoutService.config.colorScheme !== 'light';
    }

	async getTokens() {
        (await this.authService.getTokens(this.loginDto)).subscribe(
            (data) => {
                this.authData = data;
				const accessToken = data.token;
				const currentUser = data.username;
				const accessTokenExpiredDate = data.expiration;
				//console.log('Login Data = '+JSON.stringify(data));

				localStorage.setItem('accessToken', accessToken);
				localStorage.setItem('currentUser', currentUser);
				localStorage.setItem('accessTokenExpiredDate',accessTokenExpiredDate);
				
				this.router.navigate(['/dashboard']);
				// window.location.href =
				// 'http://localhost:4200/#';
                // console.log(JSON.stringify(this.authData));
                // const accessToken = data.data.tokenInfo.accessToken;
                // const refreshToken = data.data.tokenInfo.refreshToken;
                // const accessTokenExpiredDate =
                //     data.data.tokenInfo.accessTokenExpiredDate;
                // const refreshTokenExpiredDate =
                //     data.data.tokenInfo.refreshTokenExpiredDate;
                // const userName = data.data.userName;

                // const currentUser = {
                //     name: data.adSoyad,
                //     surname: data.adSoyad,
                //     title: data.title,
                // };

                // // Store currentUser object in session storage
                // sessionStorage.setItem(
                //     'currentUser',
                //     JSON.stringify(currentUser)
                // );

                // console.log(JSON.stringify('username=' + userName));
                // sessionStorage.setItem('userName', userName);
                // sessionStorage.setItem('accessToken', accessToken);
                // sessionStorage.setItem('refreshToken', refreshToken);
                // sessionStorage.setItem(
                //     'accessTokenExpiredDate',
                //     accessTokenExpiredDate
                // );
                // sessionStorage.setItem(
                //     'refreshTokenExpiredDate',
                //     refreshTokenExpiredDate
                // );
            },
            (error) => {
                if (error.status === 401) {
                    // Display error message for 401 status code
                    console.log(
                        'Unauthorized: Please provide valid credentials.'
                    );
                    //alert('Unauthorized: Please provide valid credentials.');
                    
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Hata',
                        detail: 'Giriş Sayfasına Yönlendiriliyorsunuz',
                    });
                    // sessionStorage.removeItem('accessToken');
                    // sessionStorage.clear();
                    // window.location.href =
                    //     'https://www.tarikonal.com.tr';
                } else {
                    // Handle other error cases
                    console.error('An error occurred:', error);
                }
            }
        );
    }


}