import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="flex h-screen w-full items-center justify-center gap-6">
      <h1 class="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      <button
        class="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        routerLink="/"
      >
        Return home
      </button>
    </div>
  `
})
export class NotFoundComponent {}
