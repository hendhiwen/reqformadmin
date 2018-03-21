import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

//USING service-worker
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

//USING angularfire2 firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { CommonModule, HashLocationStrategy, Location, LocationStrategy } from '@angular/common';

import { MatButtonModule, MatIconModule, MatCardModule, MatInputModule, 
  MatProgressSpinnerModule, MatDialogModule, MatTooltipModule, 
  MatDatepickerModule, MatNativeDateModule, 
  MatSnackBarModule, MatListModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './shared';
import { AuthenticationService , RequestService, MessagingService} from './shared/index';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register(environment.server_name + '/ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    CommonModule,
    HttpModule,
    AppRoutingModule,
    MatButtonModule, MatIconModule, MatCardModule, MatInputModule, 
    MatProgressSpinnerModule, MatDialogModule, MatTooltipModule, 
    MatDatepickerModule, MatNativeDateModule,
    MatSnackBarModule, MatListModule,
    AngularFireModule.initializeApp(environment.firebase), AngularFireDatabaseModule, AngularFireAuthModule
  ],
  providers: [
    AuthGuard, AuthenticationService, RequestService, MessagingService,
    Location, {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
