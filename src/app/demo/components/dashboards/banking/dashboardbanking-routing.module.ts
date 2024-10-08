import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardBankingComponent } from './dashboardbanking.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardBankingComponent }
    ])],
    exports: [RouterModule]
})
export class DashboardBankingRoutingModule { }