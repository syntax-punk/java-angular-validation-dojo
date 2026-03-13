import { ButtonComponent } from '@/_components/button/button.component';
import { AccountService } from '@/_services/account.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [ButtonComponent],
  template: `
    <nav class="sticky top-0 z-50 flex h-16 w-full items-center justify-between gap-6 bg-purple-950 px-4">
      <span class="cursor-pointer text-lg font-semibold tracking-wide text-white" (click)="router.navigate(['/'])">
        Lonely Souls
      </span>

      @if (accountService.isAuthenticated()) {
        <div id="greetings-title" class="flex flex-1 items-center justify-center gap-4">
          <span class="text-sm font-semibold text-purple-200">
            {{ greeting }}, &#64;{{ accountService.userData()?.preferred_username }}
          </span>
          @if (accountService.photoUrl()) {
            <img
              [src]="accountService.photoUrl()!"
              alt="Profile photo"
              class="h-8 w-8 rounded-full object-cover ring-2 ring-purple-400"
            />
          } @else {
            <div
              class="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-sm font-bold text-white ring-2 ring-purple-400"
            >
              {{ accountService.userData()?.preferred_username?.charAt(0)?.toUpperCase() }}
            </div>
          }
        </div>
      }

      @if (accountService.isAuthenticated()) {
        <div class="flex items-center gap-4">
          <app-button variant="primary" (clicked)="logout()">Logout</app-button>
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
  greeting = 'Welcome back';

  logout() {
    this.accountService.logout();
  }
}
