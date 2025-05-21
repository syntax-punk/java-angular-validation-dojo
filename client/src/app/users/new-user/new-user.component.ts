import { Component, effect, inject, OnInit, signal } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CreateUserDto } from '@/_models/User';
import { FormFieldErrorComponent } from '@/_components/form-error/form-field-error';
import { UsersService } from '@/_services/users.service';
import { Router } from '@angular/router';
import { TextInputComponent } from '../../_components/text-input/text-input.component';
import { norskTlfValidator } from '@/_helpers/validation';

@Component({
  selector: 'app-new-user-component',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormFieldErrorComponent,
    TextInputComponent
  ],
  templateUrl: './new-user.component.html',
  styles: ``
})
export class NewUserComponent implements OnInit {
  private usersService = inject(UsersService);
  private router = inject(Router);

  fb = inject(NonNullableFormBuilder);
  newUserForm = this.fb.group({
    firstName: this.fb.control('', Validators.required),
    lastName: this.fb.control('', Validators.required),
    username: this.fb.control('', Validators.required),
    dob: this.fb.control('', Validators.required),
    gender: this.fb.control('', Validators.required),
    email: this.fb.control('', [Validators.required, Validators.email]),
    phone: this.fb.control('', norskTlfValidator),
    bio: this.fb.control('', Validators.maxLength(256))
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
    this.isLoading.set(true);

    setTimeout(() => {
      this.createPerson();
    }, 1000);
  }

  createPerson() {
    const payload = this.newUserForm.value as CreateUserDto;

    this.usersService.createUser(payload).subscribe({
      next: response => {
        console.log('-> ', response);
        this.newUserForm.reset();
        this.router.navigate(['/']);
      },
      error: err => {
        console.error(err);
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }
}
