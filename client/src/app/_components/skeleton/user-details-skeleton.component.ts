import { Component } from '@angular/core';

@Component({
  selector: 'app-user-details-skeleton',
  imports: [],
  template: `
    <div
      class="mx-auto mt-8 min-h-[600px] max-w-xl animate-pulse rounded-lg bg-purple-100 p-6 shadow"
    >
      <div class="mb-4 h-6 w-1/3 rounded bg-slate-100"></div>
      <div class="mb-2 h-4 w-1/2 rounded bg-slate-100"></div>
      <div class="mb-6 h-4 w-1/4 rounded bg-slate-100"></div>
      <div class="grid grid-cols-2 gap-4">
        <div class="mb-2 h-4 rounded bg-slate-100"></div>
        <div class="mb-2 h-4 rounded bg-slate-100"></div>
        <div class="mb-2 h-4 rounded bg-slate-100"></div>
        <div class="mb-2 h-4 rounded bg-slate-100"></div>
      </div>
      <div class="mt-6 h-20 rounded bg-slate-100"></div>
    </div>
  `
})
export class UserDetailsSkeletonComponent {}
