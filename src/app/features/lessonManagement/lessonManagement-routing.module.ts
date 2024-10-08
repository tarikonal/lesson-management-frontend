import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/components/dashboard/dashboard.component';
import { FamilyComponent } from './components/family/family.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { AccountComponent } from './components/account/account.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { SessionComponent } from './components/session/session.component';
import { StudentComponent } from './components/student/student.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', data: { breadcrumb: 'İstatistikler' }, component: DashboardComponent },
    { path: 'family', data: { breadcrumb: 'Aile' }, component: FamilyComponent },
    { path: 'teacher', data: { breadcrumb: 'Öğretmen' }, component: TeacherComponent },
    { path: 'account', data: { breadcrumb: 'Hesaplar' }, component: AccountComponent },
    { path: 'lesson', data: { breadcrumb: 'Dersler' }, component: LessonComponent },
    { path: 'student', data: { breadcrumb: 'Öğrenci' }, component: StudentComponent },
    { path: 'session', data: { breadcrumb: 'Verilen Dersler' }, component: SessionComponent },
    //{ path: 'strateji/:AuthorizationCode', data: { breadcrumb: 'Auth' }, component: StratejiPlanComponent }
  ])],
  exports: [RouterModule]
})
export class LessonManagementRoutingModule { }
