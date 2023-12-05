import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-cliente',
  templateUrl: './navbar-cliente.component.html',
  styleUrls: ['./navbar-cliente.component.css']
})
export class NavbarClienteComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  user: string = '';

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user') || '';
  }

}
