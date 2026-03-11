import { Component, inject, OnInit } from '@angular/core';
import { UserResponseDto } from '../_models/User';
import { AccountService } from '../_services/account.service';
import { UsersService } from '../_services/users.service';
import { ListComponent } from '../users/list/list.component';

@Component({
  selector: 'app-home',
  imports: [ListComponent],
  template: `
    <div class="flex flex-col items-center justify-center gap-2">
      <app-list [usersList]="users" [loading]="loading" />
    </div>
  `
})
export class HomeComponent implements OnInit {
  private usersService = inject(UsersService);
  private accountService = inject(AccountService);
  users: UserResponseDto[] = [];
  loading = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.loadUsers();
    }, 500);
  }

  loadUsers() {
    const currentUsername = this.accountService.userData()?.preferred_username;
    this.usersService.getUsers().subscribe({
      next: response => {
        this.users = response.filter(u => u.username !== currentUsername);
        this.loading = false;
      },
      error: error => {
        console.error('Error fetching users:', error);
        this.loading = false;
      }
    });
  }
}
