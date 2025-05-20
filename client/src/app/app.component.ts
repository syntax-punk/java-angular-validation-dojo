import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
