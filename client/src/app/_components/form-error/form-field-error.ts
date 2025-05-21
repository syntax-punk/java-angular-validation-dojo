import { Component, input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  imports: [],
  template: `
    @if (isInvalidAndTouched) {
      @if (errors !== null && errors[errorType()]) {
        <ul class="py-2 text-sm font-semibold text-red-500">
          <li>
            @if (customText()) {
              <span class="custom-field-error">{{ customText() }}</span>
            } @else {
              <span class="capitalize">{{ cName() }}</span> {{ errorText() }}
            }
          </li>
        </ul>
      }
    }
  `
})
export class FormFieldErrorComponent<
  T extends { [K in keyof T]: AbstractControl<unknown, unknown> }
> {
  fGroup = input.required<FormGroup<T>>();
  cName = input.required<keyof T>();
  errorType = input<CustomFormErrorType>('required');
  errorText = input<string>('må fylles inn');
  customText = input<string>('');

  private getControl(controlName: string | any) {
    return this.fGroup().get(controlName) as FormControl;
  }

  get isInvalidAndTouched() {
    return (
      this.getControl(this.cName()).invalid &&
      this.getControl(this.cName()).touched
    );
  }

  get errors() {
    return this.getControl(this.cName()).errors;
  }
}

export type CustomFormErrorType =
  | 'required'
  | 'minlength'
  | 'maxlength'
  | 'max'
  | 'whitespace'
  | 'email'
  | 'pattern'
  | 'ugyldig';
