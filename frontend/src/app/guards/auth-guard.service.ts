import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private isAuth = false;

  constructor() {
  }

  canActivate() {
    const token = localStorage.getItem('token');
    if (token !== null && token !== undefined) {
      this.isAuth = true;
    }
    return this.isAuth;
  }
}
