import { Component, ElementRef, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { LayoutService } from '../../services/app.layout.service';

@Component({
    selector: 'app-menu-profile',
    templateUrl: './app.menuprofile.component.html',
    animations: [
        trigger('menu', [
            transition('void => inline', [
                style({ height: 0 }),
                animate(
                    '400ms cubic-bezier(0.86, 0, 0.07, 1)',
                    style({ opacity: 1, height: '*' })
                ),
            ]),
            transition('inline => void', [
                animate(
                    '400ms cubic-bezier(0.86, 0, 0.07, 1)',
                    style({ opacity: 0, height: '0' })
                ),
            ]),
            transition('void => overlay', [
                style({ opacity: 0, transform: 'scaleY(0.8)' }),
                animate('.12s cubic-bezier(0, 0, 0.2, 1)'),
            ]),
            transition('overlay => void', [
                animate('.1s linear', style({ opacity: 0 })),
            ]),
        ]),
    ],
})
export class AppMenuProfileComponent implements OnInit{
    constructor(public layoutService: LayoutService, public el: ElementRef) {}
    protected userName: string = "";
    protected fullName: string = "";

    ngOnInit(): void {
        this.SetUserInfo();
    }    

    toggleMenu() {
        this.layoutService.onMenuProfileToggle();
    }

    private SetUserInfo() {
        if(sessionStorage["userInfo"]!=null){
        var userInfoObject = JSON.parse(sessionStorage["userInfo"]);
        this.fullName = userInfoObject.adSoyad;
        this.userName = userInfoObject.kullaniciAdi;
        }
    }

    get isHorizontal() {
        return (
            this.layoutService.isHorizontal() && this.layoutService.isDesktop()
        );
    }

    get menuProfileActive(): boolean {
        return this.layoutService.state.menuProfileActive;
    }

    get menuProfilePosition(): string {
        return this.layoutService.config.menuProfilePosition;
    }

    get isTooltipDisabled(): boolean {
        return !this.layoutService.isSlim();
    }
}
