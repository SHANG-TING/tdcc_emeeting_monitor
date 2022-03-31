import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'tem-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
  theme$ = new BehaviorSubject('dark');
  sidenavCollapsed$ = new BehaviorSubject(true);

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.theme$.subscribe((theme) => {
      if (theme === 'dark') {
        document.body.parentElement?.classList.add('dark');
      } else {
        document.body.parentElement?.classList.remove('dark');
      }
    });

    this.sidenavCollapsed$.subscribe((collapsed) => {
      if (collapsed) {
        document.body.parentElement?.classList.add('aside-compact');
      } else {
        document.body.parentElement?.classList.remove('aside-compact');
      }
    });
  }

  get isDashboard() {
    return this.router.isActive('/dashboard', {
      matrixParams: 'ignored',
      queryParams: 'ignored',
      paths: 'exact',
      fragment: 'ignored',
    });
  }

  toggleTheme() {
    this.theme$.value === 'dark' ? this.theme$.next('light') : this.theme$.next('dark');
  }

  toggleSidenav() {
    this.sidenavCollapsed$.next(!this.sidenavCollapsed$.value);
  }
}
