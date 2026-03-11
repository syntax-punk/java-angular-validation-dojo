import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';
import { LoggedInUser, LoginRequest } from '../_models/Auth';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5003/api/';

  currentUser = signal<LoggedInUser | null>(null);

  constructor() {
    const stored = localStorage.getItem('user');
    if (stored) {
      this.currentUser.set(JSON.parse(stored));
    }
  }

  login(request: LoginRequest) {
    return this.http
      .post<LoggedInUser>(`${this.baseUrl}account/login`, request)
      .pipe(
        map(user => {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
