import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { AppConfigModule } from './components/config/app.config.module';
import { AppLayoutComponent } from './components/layout/app.layout.component';
import { AppBreadcrumbComponent } from './components/breadcrumb/app.breadcrumb.component';
import { AppMenuProfileComponent } from './components/menu-profile/app.menuprofile.component';
import { AppTopbarComponent } from './components/topbar/app.topbar.component';
import { AppRightMenuComponent } from './components/rightmenu/app.rightmenu.component';
import { AppMenuComponent } from './components/menu/app.menu.component';
import { AppMenuitemComponent } from './components/menu-item/app.menuitem.component';
import { RouterModule } from '@angular/router';
import { AppSidebarComponent } from './components/sidebar/app.sidebar.component';
import { AppFooterComponent } from './components/footer/app.footer.component';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { StyleClassModule } from 'primeng/styleclass';
import { ToastModule } from "primeng/toast";

@NgModule({
    declarations: [
        AppLayoutComponent,
        AppBreadcrumbComponent,
        AppMenuProfileComponent,
        AppTopbarComponent,
        AppRightMenuComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppMenuitemComponent,
        AppFooterComponent
    ], imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        StyleClassModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        TooltipModule,
        MegaMenuModule,
        RippleModule,
        RouterModule,
        ButtonModule,
        MenuModule,
        AppConfigModule,
        ToastModule], providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppLayoutModule { }
