import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-user-card-skeleton',
  host: { style: 'display: block; width: 100%;' },
  imports: [],
  template: `
    <ul class="m-auto flex h-full w-full flex-row flex-wrap gap-x-2 gap-y-12 p-4 md:w-[80%]">
      @for (_ of items(); track $index) {
        <li class="flex animate-pulse flex-col items-center justify-center gap-2">
          <div class="h-44 w-44 rounded-full bg-purple-200"></div>
          <div class="h-3 w-24 rounded-full bg-purple-200"></div>
        </li>
      }
    </ul>
  `
})
export class UserCardSkeletonComponent {
  count = input<number>(8);
  items = computed(() => Array.from({ length: this.count() }));
}
