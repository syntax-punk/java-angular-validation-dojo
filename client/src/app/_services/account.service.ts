import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private oidc = inject(OidcSecurityService);
  private http = inject(HttpClient);
  private router = inject(Router);
  private baseUrl = 'https://localhost:5003/api/';

  isAuthenticated = toSignal(
    this.oidc.isAuthenticated$.pipe(map(r => r.isAuthenticated)),
    { initialValue: false }
  );

  userData = toSignal(this.oidc.userData$.pipe(map(r => r.userData)), {
    initialValue: null
  });

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
