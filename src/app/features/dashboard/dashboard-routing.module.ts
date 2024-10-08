import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// My
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: DashboardComponent }])],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
