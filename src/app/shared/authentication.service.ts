import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType ,RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';

import { Router } from '@angular/router';

import { HRIS, MONSTERA, ANYVAR } from '../shared/global';
import { RequestService} from '../shared/request.service';

export class User {
    userId: number = 0;
    fullName: string = '';
    dept: string = '';
    company: string = '';
    photo : string = '';
    level: string = '';

    constructor(_userId: number = 0, _fullName: string = '', _company: string = '', _dept:string = '', _photo : string = '', _level : string = '') {
        this.userId = _userId || 0;
        this.fullName = _fullName || '';
        this.company = _company || '';
        this.dept = _dept;
        this.photo = _photo;
        this.level = _level;
    }
}

@Injectable()
export class AuthenticationService {
    private headersJSON = new Headers({ 'Content-Type': 'application/json' });
    private headersURLEncoded = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' });
    private currentUser: User;

    constructor(private http: Http, private router : Router, private reqSvc : RequestService) {

    }

    /* Unused */
    postLogin_v3(username: string, userpassword: string) {
        let params = {
            loginUser: username, password: userpassword, key : HRIS.SERVER_KEY
        };

        let myParams = new URLSearchParams();
        myParams.append('loginUser', username); 
        myParams.append('password', userpassword); 
        myParams.append('key', HRIS.SERVER_KEY); 

        let user : string = `loginUser=${username}&password=${userpassword}&key=${HRIS.SERVER_KEY}`;
        let options = new RequestOptions({ headers: this.headersURLEncoded });

        return new Promise((resolve, reject) => {
            this.http.post(`${HRIS.API_URL1}`, myParams,  options)
            .subscribe(res => {
                console.log(res);
                resolve(res);
            }, (err) => {
                reject(err);
            });

        });
    }

    ///LOGIN using HRIS 
    postLogin_v1(username: string, userpassword: string) {
        const options = new RequestOptions({
            headers: this.headersURLEncoded
          });
        
        let bodyParam = new URLSearchParams();
        bodyParam.append('loginUser', username); 
        bodyParam.append('password', userpassword); 
        bodyParam.append('key', HRIS.SERVER_KEY); 

        let promise = new Promise((resolve, reject) => {
            this.http.post(`${HRIS.API_URL}`, bodyParam , options)
                .timeout(2000)
                .toPromise()
                .then(
                res => { // Success
                    let jsonRes = res.json();
                    console.log(jsonRes);

                    if(jsonRes.valid != 0){
                        let data = jsonRes.data;

                        let loginUser = {
                            userId : data.NIK,
                            fullName : data.Nama,
                            company : data.Perusahaan,
                            dept : data.Departmen,
                            photo : data.Photo,
                            level : data.Level
                        }

                        localStorage.setItem(ANYVAR.APP_IS_LOGIN, 'true');
                        localStorage.setItem(ANYVAR.APP_USER_LOGIN, JSON.stringify(loginUser));
                        
                        this.currentUser = this.getUserInfo();
                        
                        resolve(jsonRes.message);
                    }else{
                        reject(jsonRes.message);
                    }                                                   
                },
                msg => { // Error
                    reject(msg);
                }
                );
        });
        return promise;
    }

    ///LOGIN using HRIS 
    postLogin(username: string, userpassword: string) {
        const options = new RequestOptions({
            headers: this.headersURLEncoded
          });
        
        let bodyParam = new URLSearchParams();
        bodyParam.append('loginUser', username); 
        bodyParam.append('password', userpassword); 
        bodyParam.append('key', HRIS.SERVER_KEY); 

        let promise = new Promise((resolve, reject) => {
            this.http.post(`${HRIS.API_URL}`, bodyParam , options)
                .timeout(4000)
                .toPromise()
                .then(
                res => { // Success
                    let jsonRes = res.json();
                    console.log(jsonRes);

                    if(jsonRes.valid != 0){
                        let data = jsonRes.data;

                        let loginUser = {
                            userId : data.NIK,
                            fullName : data.Nama,
                            company : data.Perusahaan,
                            dept : data.Departmen,
                            photo : data.Photo,
                            level : data.Level,
                            isAdmin : 1
                        }

                        let myDept : string = loginUser.dept;

                        if(myDept.toLowerCase() == 'it'){
                            //SYNC TO mit-support data
                            this.registerToSupport(loginUser).then((msg:string) =>{
                                localStorage.setItem(ANYVAR.APP_IS_LOGIN, 'true');
                                localStorage.setItem(ANYVAR.APP_USER_LOGIN, JSON.stringify(loginUser));
                                
                                this.currentUser = this.getUserInfo();
                                
                                resolve(jsonRes.message);
                            }, (err) => {
                                console.log('Error ');
                                reject(err);
                            });
                        }else{
                            console.log('Not IT user ');
                            reject("Sorry ! You are not authorized.");
                        }
                    }else{
                        reject(jsonRes.message);
                    }                                                   
                },
                msg => { // Error
                    reject(msg);
                }
                );
        });
        return promise;
    }

    registerToSupport(data : any) {
        const options = new RequestOptions({
            headers: this.headersJSON
          });
        
        let promise = new Promise((resolve, reject) => {
            this.http.post(`${MONSTERA.API_URL}/v1/users`, JSON.stringify(data) , options)
                .timeout(3000)
                .toPromise()
                .then(
                res => { // Success
                    let jsonRes = res.json();
                    
                    if(jsonRes.valid >= 200 && jsonRes.valid < 300){
                        resolve(jsonRes.message);
                    }else{
                        reject(jsonRes.message);
                    }                                                   
                },
                msg => { // Error
                    reject(msg);
                }
                );
        });
        return promise;
    }


    public getUserInfo(): User {
        if(this.currentUser == null){
            if(localStorage.getItem(ANYVAR.APP_USER_LOGIN)){
                let data = JSON.parse(localStorage.getItem(ANYVAR.APP_USER_LOGIN));

                this.currentUser = new User(data.userId, data.fullName, data.company, data.dept, data.photo, data.level);
            }
        }        
        
        return this.currentUser;   
    }

    public getUserFCMToken(): string {
        let data : string = "";
        if(localStorage.getItem(ANYVAR.APP_FCM_TOKEN)){
            data = localStorage.getItem(ANYVAR.APP_FCM_TOKEN);
        }      
        
        return data;   
    }

    logout(): void {
        let params = { 
            nik : this.getUserInfo().userId,
            registrationToken : this.getUserFCMToken(),
            status : 9
        }
        
        this.reqSvc.deleteFCMToken(params).then((data:any) =>{
            console.log("Token has been removed " + data.message);
        },(err) =>{
            console.log(err);
        })

        // clear token remove user from local storage to log user out
        this.currentUser = null;

        localStorage.removeItem(ANYVAR.APP_FCM_TOKEN); 
        localStorage.removeItem(ANYVAR.APP_IS_LOGIN);  
        localStorage.removeItem(ANYVAR.APP_USER_LOGIN);     

        //localStorage.clear();
        this.router.navigate(['/login']);
    }   
}