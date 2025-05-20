import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from './_services/users.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private toastr = inject(ToastrService);
  private usersSvc = inject(UsersService);

  title: string = '';

  ngOnInit(): void {
    this.toastr.success('Hello world!');
    this.getUsers();
  }

  getUsers() {
    this.usersSvc.test().subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.log(error);
      },
    });
  }
}
