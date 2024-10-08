// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Theme
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule } from 'primeng/dataview';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { InputSwitchModule } from 'primeng/inputswitch';
// My
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardService } from './services/dashboard.service';
//import { GraphsService } from '../strateji/services/graphs.service';

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ButtonModule,
        DialogModule,
        FileUploadModule,
        FormsModule,
        InputMaskModule,
        InputTextModule,
        MenuModule,
        ReactiveFormsModule,
        SharedModule,
        TableModule,
        TooltipModule,
        ChartModule,
        DropdownModule,
        InputSwitchModule,
        DataViewModule,
        InputTextareaModule,
        RippleModule,
    ],
    providers:[ // Servisleri ekleyin
        DashboardService,
        //GraphsService
    ]
})
export class DashboardModule {}
