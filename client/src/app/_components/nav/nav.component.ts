import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink],
  template: `
    <nav
      class="flex h-16 w-full items-center justify-between gap-6 bg-purple-950 px-4"
    >
      <div class="flex gap-4">
        <a
          class="rounded-md bg-slate-200 px-2 py-1 text-base font-medium text-blue-900 hover:bg-slate-300"
          [routerLink]="['/']"
          routerLinkActive="bg-gray-300"
        >
          Home
        </a>
        <a
          class="rounded-md bg-slate-200 px-2 py-1 text-base font-medium text-blue-900 hover:bg-slate-300"
          [routerLink]="['/users/new']"
          routerLinkActive="bg-gray-300"
        >
          Register
        </a>
      </div>
    </nav>
  `
})
export class NavComponent {
  private router = inject(Router);
}
