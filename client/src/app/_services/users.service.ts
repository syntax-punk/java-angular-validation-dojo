import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateUserDto, IdResposeDto, UserResponseDto } from '../_models/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5003/api/';

  getUsers() {
    return this.http.get<UserResponseDto[]>(`${this.baseUrl}users`);
  }

  createUser(payload: CreateUserDto) {
    return this.http.post<IdResposeDto>(`${this.baseUrl}users`, payload);
  }
}
