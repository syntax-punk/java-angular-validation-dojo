import { UserResponseDto } from '@/_models/User';
import { UsersService } from '@/_services/users.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {
  route = inject(ActivatedRoute);
  userService = inject(UsersService);
  user?: UserResponseDto;

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
