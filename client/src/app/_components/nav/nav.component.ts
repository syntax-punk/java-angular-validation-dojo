import { ButtonComponent } from '@/_components/button/button.component';
import { AccountService } from '@/_services/account.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [ButtonComponent],
  template: `
    <nav
      class="relative flex h-16 w-full items-center justify-between gap-6 bg-purple-950 px-4"
    >
      <span
        class="cursor-pointer text-lg font-semibold tracking-wide text-white"
        (click)="router.navigate(['/'])"
      >
        Lonely Souls
      </span>

      @if (accountService.isAuthenticated()) {
        <div class="flex items-center gap-4">
          <span class="text-sm font-semibold text-purple-200">
            &#64;{{ accountService.userData()?.preferred_username }}
          </span>
          <app-button variant="secondary" (clicked)="logout()">
            Logout
          </app-button>
        </div>
      } @else {
        <app-button variant="tonal" [link]="['/login']">Sign in</app-button>
      }
    </nav>
  `
})
export class NavComponent {
  accountService = inject(AccountService);
  router = inject(Router);
  logout() {
    this.accountService.logout();
  }
}
