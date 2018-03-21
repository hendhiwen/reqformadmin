import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import { ANYVAR } from '../shared/global';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
        if (localStorage.getItem(ANYVAR.APP_IS_LOGIN)) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
