import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersDataService } from '../users-data.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  user: User | undefined;
  userId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private usersDataService: UsersDataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = parseInt(params['userId'], 10);

      if (this.userId) {
        this.user = this.usersDataService.getUserById(this.userId);
      }
    });
  }
}
