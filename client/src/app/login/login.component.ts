import { ButtonComponent } from '@/_components/button/button.component';
import { AccountService } from '@/_services/account.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [ButtonComponent],
  template: `
    <div class="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div class="w-full max-w-sm rounded-lg bg-purple-100 p-8 shadow-md">
        <h1 class="mb-6 text-2xl font-bold text-slate-800">Sign in</h1>
        <p class="mb-6 text-sm text-slate-600">
          You will be redirected to the identity provider to sign in.
        </p>
        <app-button (clicked)="login()">Continue to sign in</app-button>
      </div>
    </div>
  `
})
export class LoginComponent {
  private accountService = inject(AccountService);

  login() {
    this.accountService.login();
  }
}
