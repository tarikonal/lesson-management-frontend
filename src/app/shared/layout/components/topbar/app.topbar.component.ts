import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../services/app.layout.service';
import { CurrentUser } from 'src/app/core/models/current-user.model';


@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopbarComponent {
    @ViewChild('menuButton') menuButton!: ElementRef;

    @ViewChild('mobileMenuButton') mobileMenuButton!: ElementRef;
    user = new CurrentUser();

    constructor(
        public layoutService: LayoutService,
        public el: ElementRef,
        private router: Router
    ) {}

    activeItem!: number;

    get mobileTopbarActive(): boolean {
        return this.layoutService.state.topbarMenuActive;
    }

    get getCurrentUser() {
        //this.user = JSON.parse(<string>sessionStorage.getItem('currentUser'));
        //this.user = <string>sessionStorage.getItem('currentUser');
        //return (this.user.firstname + " " + this.user.lastname)
        // if (this.user === null) {
        //     return '';
        // }

        return localStorage.getItem('currentUser');;
    }
    
    get getTitle() {
        this.user = JSON.parse(<string>sessionStorage.getItem('currentUser'));
        return this.user.title;
    }

    logout() {
        localStorage.clear();
        //this.router.navigate(['/auth/login']);
        //window.location.href = 'http://localhost:4200/login2';
        window.location.href = 'https://ders.tarikonal.com.tr';
    }

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onMobileTopbarMenuButtonClick() {
        this.layoutService.onTopbarMenuToggle();
    }
}
