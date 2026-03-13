import { ButtonComponent } from '@/_components/button/button.component';
import { AccountService } from '@/_services/account.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [ButtonComponent],
  template: `
    <section id="login-page" class="flex h-full min-h-[calc(100vh-10rem)] items-center justify-center">
      <div id="welcome-banner" class="flex items-center justify-center">
        <div class="w-full max-w-sm min-w-2xl rounded-lg bg-purple-100 p-8 shadow-md">
          <h1 class="mb-6 text-center text-2xl font-bold text-slate-800">Welcome to the Lonely Souls</h1>
          <p class="mb-6 text-sm text-slate-600">
            Please sign in to your account to continue. If you don't have an account, you can register for free. Our
            platform offers a safe and welcoming space for individuals seeking meaningful connections.
          </p>
          <div class="flex items-center justify-between gap-3">
            <app-button id="sign-in" (clicked)="login()">Sign in</app-button>
            <app-button variant="tonal" [link]="['/users/new']">Register</app-button>
          </div>
        </div>
      </div>
    </section>
  `
})
export class LoginComponent {
  private accountService = inject(AccountService);

  login() {
    this.accountService.login();
  }
}
