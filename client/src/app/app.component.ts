import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'n-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  navLinks: any[] = [];
  pageLoading: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.pageLoading = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.pageLoading = false;
      }
    });
  }
}
