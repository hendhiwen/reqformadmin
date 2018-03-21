import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animation';

import { AuthenticationService } from '../shared/authentication.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  myUser = {userName:"", userPassword:""};

  constructor(private authSvc : AuthenticationService, private router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
      
  }

  onLogin() {
    this.doLogin();             
  }

  private doLogin(){
    this.authSvc.postLogin(this.myUser.userName, this.myUser.userPassword).then((result:string) => {
        //console.log('[doLogin] ' + result + this.authSvc.getUserInfo().userId);
        if(this.authSvc.getUserInfo() != null){
            this.router.navigate(['/dashboard']);
        }else{
            //alert
            this.myUser.userPassword = '';
            this.openAlert(result);
        }        
    }, (err) => {
        this.myUser.userPassword = '';
        //this.openAlert(err);
        this.openAlert("Please check your internet !");
    });
  }

  private onKeyDown(event: any) {
      if (this.myUser.userName != '' && this.myUser.userPassword != '') {
          this.doLogin();
      } else {
          this.handleButtonDisable();
      }
  }

  public handleButtonDisable() {
      if (this.myUser.userName != '' && this.myUser.userPassword != '') {
          return false;
      } else {
          return true;
      }
  }

  private openAlert(_msg : string = '', _title : string = ''): void {
    this.snackBar.open(_msg,_title,{duration: 2000});
  }
}
