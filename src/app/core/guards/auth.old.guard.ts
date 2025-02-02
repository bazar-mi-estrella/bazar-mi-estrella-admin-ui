import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Auth Services
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged, User } from 'firebase/auth';


@Injectable({ providedIn: 'root' })
export class AuthGuard {
    constructor(
        private router: Router,
        private readonly auth: Auth

    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

       
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
              console.log('Usuario autenticado:', user);
            } else {
              console.log('No hay usuario autenticado');
            }
          });

        onAuthStateChanged(this.auth, (user) => {
            if (user) {
              console.log('Usuario autenticado:', user);
            } else {
              console.log('No hay usuario autenticado');
            }
          });

        // not logged in so redirect to login page with the return url
        return false;
    }
}
