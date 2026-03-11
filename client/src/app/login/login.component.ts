import { ButtonComponent } from '@/_components/button/button.component';
import { TextInputComponent } from '@/_components/text-input/text-input.component';
import { AccountService } from '@/_services/account.service';
import { Component, inject, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, TextInputComponent, ButtonComponent],
  template: `
    <div class="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div class="w-full max-w-sm rounded-lg bg-purple-100 p-8 shadow-md">
        <h1 class="mb-6 text-2xl font-bold text-slate-800">Sign in</h1>

        <form
          [formGroup]="loginForm"
          (ngSubmit)="submit()"
          class="flex flex-col gap-4"
        >
          <app-text-input
            id="username"
            label="Username"
            formControlName="username"
            required
          />
          <app-text-input
            id="password"
            label="Password"
            type="password"
            formControlName="password"
            required
          />

          @if (error()) {
            <p class="text-sm font-semibold text-red-500">{{ error() }}</p>
          }

          <app-button type="submit" [disabled]="isLoading()">
            {{ isLoading() ? 'Signing in...' : 'Sign in' }}
          </app-button>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  private accountService = inject(AccountService);
  private router = inject(Router);
  private fb = inject(NonNullableFormBuilder);

  loginForm = this.fb.group({
    username: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required)
  });

  isLoading = signal(false);
  error = signal('');

  submit() {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    this.error.set('');

    this.accountService.login(this.loginForm.getRawValue()).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: () => {
        this.error.set('Invalid username or password');
        this.isLoading.set(false);
      },
      complete: () => this.isLoading.set(false)
    });
  }
}
