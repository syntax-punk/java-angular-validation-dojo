import { Component, effect, inject, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CreateUserDto } from '@/_models/User';
import { FormFieldErrorComponent } from '@/_components/form-error/form-field-error';
import { UsersService } from '@/_services/users.service';

@Component({
  selector: 'app-new-user-component',
  imports: [FormsModule, ReactiveFormsModule, FormFieldErrorComponent],
  templateUrl: './new-user.component.html',
  styles: ``,
})
export class NewUserComponent implements OnInit {
  private usersService = inject(UsersService);

  fb = inject(NonNullableFormBuilder);
  newUserForm = this.fb.group({
    firstName: this.fb.control('', [Validators.required]),
    lastName: this.fb.control('', [Validators.required]),
    username: this.fb.control('', [Validators.required]),
    dob: this.fb.control('', [Validators.required]),
    gender: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [Validators.email]),
    phone: this.fb.control(''),
    bio: this.fb.control(''),
  });

  isLoading = signal(false);

  constructor() {
    effect(() => {
      if (this.isLoading()) this.newUserForm.disable();
      else this.newUserForm.enable();
    });
  }

  ngOnInit() {}

  submitForm() {
    if (!this.newUserForm.valid) {
      return;
    }

    this.createPerson();
  }

  createPerson() {
    const payload = this.newUserForm.value as CreateUserDto;

    this.usersService.createUser(payload).subscribe({
      next: response => {
        console.log('-> ', response);
      },
      error: err => {
        console.error(err);
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
