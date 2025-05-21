import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-server-error',
  imports: [RouterLink],
  template: `
    <dialog
      class="flex h-screen w-full items-center justify-center"
      open
      role="alertdialog"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <div class="flex flex-col items-center justify-center gap-6">
        <h1 class="text-4xl font-bold text-gray-800">500 - Server Error</h1>
        <p class="text-lg text-gray-600">
          Server error occurred. Please try again later.
        </p>
        <button
          class="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          routerLink="/"
          routerLinkActive="bg-blue-600"
        >
          Return home
        </button>
      </div>
    </dialog>
  `
})
export class ServerErrorComponent {}
