import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5003/api/';

  test() {
    return this.http.get(this.baseUrl + 'users');
  }
}
