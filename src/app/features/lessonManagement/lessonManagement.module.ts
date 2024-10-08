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


@NgModule({
    declarations: [
        TeacherComponent,
        StudentComponent,
        LessonComponent,
        SessionComponent,
        AccountComponent,
        FamilyComponent
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
    ],
    providers: [ // Servisleri ekleyin.
        TeacherService,       
        StudentService,
        LessonService,
        SessionService,
        AccountService,
        FamilyService,
    ], 
})
export class LessonManagementModule {}
