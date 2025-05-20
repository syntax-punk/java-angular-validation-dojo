import { Component, inject, OnInit } from '@angular/core';
import { ListComponent } from '../users/list/list.component';
import { UsersService } from '../_services/users.service';
import { UserResponseDto } from '../_models/User';

@Component({
  selector: 'app-home',
  imports: [ListComponent],
  template: `
    <div class="flex flex-col items-center justify-center gap-2">
      <h2 class="p-2 font-mono text-2xl uppercase">Users</h2>
      <app-list [usersList]="users" />
    </div>
  `,
})
export class HomeComponent implements OnInit {
  private usersService = inject(UsersService);
  users: UserResponseDto[] = [];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
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
