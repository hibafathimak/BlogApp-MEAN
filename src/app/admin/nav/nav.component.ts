import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  showMenu = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  closeMenu() {
    this.showMenu = false;
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
}
