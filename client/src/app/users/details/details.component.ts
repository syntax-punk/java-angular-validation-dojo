import { AvatarComponent } from '@/_components/avatar/avatar.component';
import { ButtonComponent } from '@/_components/button/button.component';
import { UserDetailsSkeletonComponent } from '@/_components/skeleton/user-details-skeleton.component';
import { UserResponseDto } from '@/_models/User';
import { UsersService } from '@/_services/users.service';
import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [ButtonComponent, AvatarComponent, UserDetailsSkeletonComponent],
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {
  route = inject(ActivatedRoute);
  userService = inject(UsersService);
  location = inject(Location);
  user?: UserResponseDto;

  back(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.userService.getUserById(id).subscribe({
      next: userResponse => {
        this.user = userResponse;
      }
    });
  }
}
