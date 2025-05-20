import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserResponseDto } from '../_models/UserResponseDto';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5003/api/';

  getUsers() {
    return this.http.get<UserResponseDto[]>(`${this.baseUrl}/users`);
  }
}
