import { AvatarComponent } from '@/_components/avatar/avatar.component';
import { UserCardSkeletonComponent } from '@/_components/skeleton/user-card-skeleton.component';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserResponseDto } from '../../_models/User';

@Component({
  selector: 'app-list',
  imports: [RouterLink, AvatarComponent, UserCardSkeletonComponent],
  templateUrl: './list.component.html'
})
export class ListComponent {
  usersList = input.required<UserResponseDto[]>();
  loading = input<boolean>(false);
}
