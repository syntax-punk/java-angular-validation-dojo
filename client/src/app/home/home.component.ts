import { Component, inject, OnInit } from '@angular/core';
import { ListComponent } from '../users/list/list.component';
import { UsersService } from '../_services/users.service';
import { UserResponseDto } from '../_models/UserResponseDto';

@Component({
  selector: 'app-home',
  imports: [ListComponent],
  template: `
    <div class="flex h-full w-full items-center justify-center">
      <app-list></app-list>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  private usersService = inject(UsersService);
  users: UserResponseDto[] = [];

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getUsers() {
    this.usersService.getUsers().subscribe({
      next: response => {
        this.users = response;
      },
      error: error => {
        console.error('Error fetching users:', error);
      },
    });
  }
}
