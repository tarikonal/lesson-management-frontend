// Core
import { NgModule } from '@angular/core';
import {
    DatePipe,
    HashLocationStrategy,
    LocationStrategy,
    NgIf,
} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './shared/layout/app.layout.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// Theme
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
// My
import { CustomSpinnerComponent } from './shared/layout/components/custom-spinner/custom-spinner.component';
import { InterceptService } from './core/services/intercept.service';

@NgModule({
    declarations: [AppComponent, CustomSpinnerComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        NgIf,
        ToastModule,
        ConfirmDialogModule,
        InputSwitchModule,
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },

        { provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true },
        MessageService,
        ConfirmationService,
        DatePipe,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
