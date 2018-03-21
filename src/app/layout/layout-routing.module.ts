import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'dashboard',      component: HomeComponent },
            //{ path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'history',           component: HistoryComponent },
            //{ path: 'table',          component: TablesComponent },
            { path: '',          redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
