import { booleanAttribute, Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'tonal';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-purple-800 text-white hover:bg-purple-700',
  secondary:
    'bg-white text-purple-800 border border-purple-800 hover:bg-purple-50',
  ghost: 'text-purple-800 hover:text-purple-600',
  tonal: 'bg-purple-200 text-purple-900 hover:bg-purple-300'
};

@Component({
  selector: 'app-button',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <button
      [class]="
        baseClasses +
        ' ' +
        variantClasses() +
        (disabled() ? ' cursor-not-allowed opacity-50' : '')
      "
      [type]="type()"
      [disabled]="disabled()"
      [routerLink]="link() ?? null"
      [routerLinkActive]="link() ? 'opacity-80 ring-2 ring-white/40' : ''"
      (click)="clicked.emit()"
    >
      <ng-content />
      {{ label() }}
    </button>
  `
})
export class ButtonComponent {
  label = input<string>('');
  variant = input<ButtonVariant>('primary');
  link = input<string[] | null>(null);
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input(false, { transform: booleanAttribute });
  clicked = output<void>();

  baseClasses =
    'inline-flex items-center gap-1 px-4 py-2 rounded text-sm font-medium transition-colors cursor-pointer';

  variantClasses(): string {
    return VARIANT_CLASSES[this.variant()];
  }
}
