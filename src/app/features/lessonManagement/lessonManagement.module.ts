// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Theme
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
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
import { MessageService } from 'primeng/api';
// My Modules
import { LessonManagementRoutingModule } from './lessonManagement-routing.module';
// My Services
import { TeacherService } from './services/teacher.service';
import { StudentService } from './services/student.service';
import { LessonService } from './services/lesson.service';
import { SessionService } from './services/session.service';
import { AccountService } from './services/account.service';
import { FamilyService } from './services/family.service';
// My Components
import { SessionComponent } from './components/session/session.component';
import { AccountComponent } from './components/account/account.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { StudentComponent } from './components/student/student.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { FamilyComponent } from './components/family/family.component';
//import { Login2Module } from './components/login2/login2.module';
//import { Login2Component } from './components/login2/login2.component';


@NgModule({
    declarations: [
        TeacherComponent,
        StudentComponent,
        LessonComponent,
        SessionComponent,
        AccountComponent,
        FamilyComponent,
        //Login2Component
    ],
    imports: [
        CommonModule,
        LessonManagementRoutingModule,
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
        CalendarModule
    ],
    providers: [ // Servisleri ekleyin.
        TeacherService,       
        StudentService,
        LessonService,
        SessionService,
        AccountService,
        FamilyService,
        MessageService
    ], 
})
export class LessonManagementModule {}
