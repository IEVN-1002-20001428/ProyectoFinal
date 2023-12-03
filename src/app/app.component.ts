import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ProyectoFinal';

  userType: string = '';
  showNavbar: boolean = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !this.shouldHideNavbar(event.url);
        this.userType = this.authService.getUserType();
        console.log(this.userType);
      }
    });
  }

  private shouldHideNavbar(url: string): boolean {
    return url.includes('admin') || url.includes('login') || url.includes('registrar');
  }

}
