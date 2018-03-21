import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';

import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { LbdModule } from './lbd/lbd.module';
import { HomeModule } from './home/home.module';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule, MatFormFieldModule, 
        NavbarModule, SidebarModule, FooterModule, LbdModule, HomeModule
    ],
    declarations: [LayoutComponent, HomeComponent, HistoryComponent]
})
export class LayoutModule {}
