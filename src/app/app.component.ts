import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { User } from './user.model';
import { UsersDataService } from './users-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor(private dialog: MatDialog, private cdr: ChangeDetectorRef ,private usersDataService: UsersDataService) { }
  userList: User[] = []; 

  users: User[] = [];

  fetchUsers() {
    this.usersDataService.fetchUsers().subscribe(
      (users) => {
        this.users = users;
        console.log('Fetched users:', this.users);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }ngOnInit() {
    // this.usersDataService.users$.subscribe((users) => {
    //   this.users = users;
    // });
    this.fetchUsers();
    
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '600px',
      height: '600px'
    });

    dialogRef.afterOpened().subscribe(() => {
      this.cdr.detectChanges();
    });
  }
}
