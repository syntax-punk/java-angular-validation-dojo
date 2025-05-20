import { Component, input } from '@angular/core';
import { UserResponseDto } from '../../_models/User';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [RouterLink],
  templateUrl: './list.component.html',
})
export class ListComponent {
  usersList = input.required<UserResponseDto[]>();
}
