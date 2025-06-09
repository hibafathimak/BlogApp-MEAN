import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, RouterLink, NgIf,RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  isloggedin: boolean = false;
  loggedUsername: string = '';
  handleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  constructor(private router: Router) {}

  ngOnInit() {
    if (sessionStorage.getItem('token') && sessionStorage.getItem('user')) {
      this.isloggedin = true;
      this.loggedUsername = JSON.parse(
        sessionStorage.getItem('user') || ''
      ).username.split(' ')[0];
    } else {
      this.isloggedin = false;
      this.loggedUsername = '';
    }
  }
  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.isloggedin = false;
    this.loggedUsername = '';
    this.router.navigateByUrl('/');
  }
}