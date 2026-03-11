import { ButtonComponent } from '@/_components/button/button.component';
import { AccountService } from '@/_services/account.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [ButtonComponent],
  template: `
    <nav
      class="flex h-16 w-full items-center justify-between gap-6 bg-purple-950 px-4"
    >
      <app-button variant="tonal" [link]="['/']">Home</app-button>

      @if (accountService.currentUser()) {
        <div class="flex items-center gap-4">
          <span class="text-sm text-purple-200">{{ accountService.currentUser()?.username }}</span>
          <app-button variant="tonal" [link]="['/users/new']">Register</app-button>
          <app-button variant="secondary" (clicked)="logout()">Logout</app-button>
        </div>
      } @else {
        <app-button variant="tonal" [link]="['/login']">Login</app-button>
      }
    </nav>
  `
})
export class NavComponent {
  accountService = inject(AccountService);
  private router = inject(Router);

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }
}
