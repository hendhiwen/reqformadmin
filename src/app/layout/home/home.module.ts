import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent, DialogResolve } from './home.component';

import { MatToolbarModule, MatListModule, MatIconModule, 
         MatCardModule, MatButtonModule, MatExpansionModule, 
         MatFormFieldModule, MatTooltipModule, MatTabsModule,
         MatDialogModule, MatInputModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule, FormsModule, MatToolbarModule, MatListModule, MatIconModule, 
        MatCardModule, MatButtonModule, MatExpansionModule, 
        MatFormFieldModule, MatTooltipModule, MatTabsModule,
        MatDialogModule, MatInputModule
    ],
    declarations: [
        DialogResolve
    ],
    entryComponents:[
        DialogResolve
    ]
})
export class HomeModule {}
