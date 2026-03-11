import { Component, input, output } from '@angular/core';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-purple-800 text-white hover:bg-purple-700',
  secondary:
    'bg-white text-purple-800 border border-purple-800 hover:bg-purple-50',
  ghost: 'text-purple-800 hover:text-purple-600'
};

@Component({
  selector: 'app-button',
  imports: [],
  template: `
    <button
      [class]="baseClasses + ' ' + variantClasses()"
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
  clicked = output<void>();

  baseClasses =
    'inline-flex items-center gap-1 px-4 py-2 rounded text-sm font-medium transition-colors cursor-pointer';

  variantClasses(): string {
    return VARIANT_CLASSES[this.variant()];
  }
}
