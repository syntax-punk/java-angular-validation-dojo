import { Component, input } from '@angular/core';

type AvatarSize = 'md' | 'lg';

const OUTER_CLASSES: Record<AvatarSize, string> = {
  md: 'w-44 h-44',
  lg: 'w-48 h-48'
};

const INNER_CLASSES: Record<AvatarSize, string> = {
  md: 'w-40 h-40',
  lg: 'w-46 h-46'
};

@Component({
  selector: 'app-avatar',
  imports: [],
  template: `
    <div
      class="flex cursor-pointer items-center justify-center rounded-full bg-purple-800 transition-all duration-200 ease-in-out"
      [class]="outerClasses()"
    >
      <img
        class="rounded-full object-cover transition-all duration-500 ease-in-out hover:scale-105"
        [class]="innerClasses()"
        [src]="src()"
        [alt]="alt()"
      />
    </div>
  `
})
export class AvatarComponent {
  src = input<string>('');
  alt = input<string>('Avatar');
  size = input<AvatarSize>('lg');

  outerClasses(): string {
    return OUTER_CLASSES[this.size()];
  }
  innerClasses(): string {
    return INNER_CLASSES[this.size()];
  }
}
