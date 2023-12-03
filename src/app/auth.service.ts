import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  private loggedIn = false;
  private userType: string = 'default';

  login(userType: string) {
    this.loggedIn = true;
    this.userType = userType;
    localStorage.setItem('userType', userType);
  }

  logout() {
    this.loggedIn = false;
    this.userType = '';
    localStorage.removeItem('userType');
    localStorage.removeItem('Productos');
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getUserType(): string {
    return localStorage.getItem('userType') || 'default';
  }
}
