import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <section class="mx-auto mt-8 min-h-[600px] max-w-xl rounded-lg border border-slate-100 bg-purple-100 p-6 shadow-md">
      <ng-content />
    </section>
  `
})
export class CardComponent {}
