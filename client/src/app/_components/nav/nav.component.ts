import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink],
  template: `
    <nav class="flex h-16 w-full items-center justify-center gap-2 bg-blue-50">
      <a
        class="rounded-md bg-slate-200 px-2 py-1 text-base font-medium text-blue-900 hover:underline"
        [routerLink]="['/']"
        routerLinkActive="bg-gray-300">
        Home
      </a>
      <a
        class="rounded-md bg-slate-200 px-2 py-1 text-base font-medium text-blue-900 hover:underline"
        [routerLink]="['/users/new']"
        routerLinkActive="bg-gray-300">
        New User
      </a>
    </nav>
  `,
})
export class NavComponent {
  private router = inject(Router);
}
