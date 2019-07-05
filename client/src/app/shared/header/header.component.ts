import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'n-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  cartItems: number;

  constructor(private router: Router) {
  }

  goToUserPage(): void {
    this.router.navigate(['user/login']);
  }

  goToHomePage(): void {
    this.router.navigate(['']);
  }
}
