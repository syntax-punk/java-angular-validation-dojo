import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { filter, map, switchMap } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private oidc = inject(OidcSecurityService);
  private http = inject(HttpClient);
  private router = inject(Router);
  private usersService = inject(UsersService);
  private baseUrl = 'https://localhost:5003/api/';

  isAuthenticated = toSignal(this.oidc.isAuthenticated$.pipe(map(r => r.isAuthenticated)), { initialValue: false });

  userData = toSignal(this.oidc.userData$.pipe(map(r => r.userData)), {
    initialValue: null
  });

  photoUrl = signal<string | null>(null);

  constructor() {
    this.oidc.isAuthenticated$
      .pipe(
        map(r => r.isAuthenticated),
        filter(auth => auth),
        switchMap(() => this.usersService.getMyPhoto())
      )
      .subscribe(r => this.photoUrl.set(r.photoUrl));
  }

  login() {
    this.oidc.authorize();
  }

  logout() {
    const done = () => {
      this.oidc.logoffLocal();
      this.router.navigateByUrl('/login');
    };
    this.http.post(`${this.baseUrl}auth/logout`, {}).subscribe({
      next: done,
      error: done
    });
  }

  checkAuth() {
    return this.oidc.checkAuth();
  }
}
