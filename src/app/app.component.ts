import { Component, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
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
  userList: User[] = [];
  users: User[] = [];
  displayedColumns: string[] = ['nId', 'firstName', 'lastName', 'gender'];
  searchText: string = '';

  constructor(
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private usersDataService: UsersDataService
  ) {}

  ngOnInit() {
    this.loadUsers();
    this.fetchUsers();
  }

  loadUsers() {
    this.userList = this.usersDataService.getUsers();
    this.applySearchFilter();
  }

  fetchUsers() {
    this.usersDataService.users$.subscribe(
      (users) => {
        this.userList = users;
        this.applySearchFilter();
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  applySearchFilter() {
    this.users = this.userList.filter((user) =>
      this.isMatchingSearch(user, this.searchText)
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '600px',
      height: '600px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchUsers();
    });
  }

  private isMatchingSearch(user: User, searchText: string): boolean {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchText.toLowerCase());
  }
}
