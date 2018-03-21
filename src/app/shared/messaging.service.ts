import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth }     from 'angularfire2/auth';
import * as firebase from 'firebase';

import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { RequestService} from '../shared/request.service';
import { AuthenticationService} from '../shared/authentication.service';

import { MatSnackBar } from '@angular/material';

import { ANYVAR } from '../shared/global';

@Injectable()
export class MessagingService {
  messaging = firebase.messaging()
  currentMessage = new BehaviorSubject(null)

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, 
    private authSvc : AuthenticationService, private reqSvc : RequestService, 
    private snackBar : MatSnackBar) { }

  updateToken(token) {
    this.afAuth.authState.take(1).subscribe(user => {
      if (!user) return;

      const data = { [user.uid]: token }
      this.db.object('fcmTokens/').update(data)
    })
  }

  getPermission() {
    this.messaging.requestPermission()
    .then(() => {
      //console.log('Notification permission granted.');
      return this.messaging.getToken();
    })
    .then(token => {
      //console.log(token);

      //UPDATE TO database
      let params = { 
        nik : this.authSvc.getUserInfo().userId,
        registrationToken : token
      }
      
      this.reqSvc.updateFCMToken(params).then((data:any) =>{
        console.log("Permission is now active");
        localStorage.setItem(ANYVAR.APP_FCM_TOKEN, token);
        //this.updateToken(token);
      },(err) =>{
        console.log(err);
      })
      
      this.updateToken(token);
    })
    .catch((err) => {
      console.log('Unable to get permission to notify.', err);
    });
  }

  receiveMessage() {
     this.messaging.onMessage((payload : any) => {
      console.log("Message received. 1 ", payload);
      this.currentMessage.next(payload);
      //console.log("Message received. 2 ", payload.data);
      //console.log("Message received. 2 ", payload.notification.title);
      this.openAlert(payload.notification.title);
    });
  }

  private openAlert(_msg : string = ''): void {
    this.snackBar.open(_msg,'', { duration: 3000 });
  }

}
