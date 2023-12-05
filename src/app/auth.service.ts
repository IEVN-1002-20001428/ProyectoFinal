import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  private loggedIn = false;
  private userType: string = 'default';
  private user: string = '';

  login(userType: string, user: string) {
    this.loggedIn = true;
    this.userType = userType;
    this.user = user;
    localStorage.setItem('userType', userType);
    localStorage.setItem('user', user);
  }

  logout() {
    this.loggedIn = false;
    this.userType = '';
    localStorage.removeItem('userType');
    localStorage.removeItem('user');
    localStorage.removeItem('Productos');
    location.reload();
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getUserType(): string {
    return localStorage.getItem('userType') || 'default';
  }
}
