import { AbstractControl } from '@angular/forms';

export type CustomFormErrorType =
  | 'required'
  | 'minlength'
  | 'maxlength'
  | 'max'
  | 'whitespace'
  | 'email'
  | 'pattern'
  | 'tooYoung'
  | 'futureDate'
  | 'phone';

export const TLF_PATTERNS = {
  ALL: /^\+?\d{8,14}$/,
  NO: /^[4-9]\d{7}$/
};

export function norskTlfValidator(
  control: AbstractControl
): { [key in CustomFormErrorType]?: boolean } | null {
  const tlf = control.value;

  if (tlf && !TLF_PATTERNS.NO.test(tlf)) {
    return { phone: true };
  }

  return null;
}
