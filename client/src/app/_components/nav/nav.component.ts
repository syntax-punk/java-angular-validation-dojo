import { ButtonComponent } from '@/_components/button/button.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  imports: [ButtonComponent],
  template: `
    <nav
      class="flex h-16 w-full items-center justify-between gap-6 bg-purple-950 px-4"
    >
      <app-button variant="tonal" [link]="['/']">Home</app-button>
      <app-button variant="tonal" [link]="['/users/new']">Register</app-button>
    </nav>
  `
})
export class NavComponent {}
