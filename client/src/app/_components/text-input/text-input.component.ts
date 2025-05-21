import { booleanAttribute, Component, input, Self } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  imports: [ReactiveFormsModule],
  templateUrl: './text-input.component.html'
})
export class TextInputComponent implements ControlValueAccessor {
  id = input.required<string>();
  label = input<string>('');
  required = input(false, { transform: booleanAttribute });
  type = input<string>('text');

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }

  writeValue(): void {}
  registerOnChange(): void {}
  registerOnTouched(): void {}
}
