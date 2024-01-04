import { Component, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { User } from './user.model';
import { UsersDataService } from './users-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  userList: User[] = [];
  users: User[] = [];
  displayedColumns: string[] = ['nId', 'firstName', 'lastName', 'gender',  'delete', 'edit'];
  searchText: string = '';

  currentPage: number = 1;
  usersPerPage: number = 2;
  totalPages: number = 1;

  constructor(
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private router: Router,
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

  // applyFilter() {
  //   this.fetchUsers(); // Refresh the users based on the updated searchText
  // }

  redirectToDetailsPage(userId: number): void {
    this.router.navigate(['/user', userId]);
  }

  editUser(userId: number): void {
    // Navigate to the user details page for editing
    this.router.navigate(['/user', userId]);
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

  applyFilter() {
    this.currentPage = 1; // Reset to the first page when applying a filter
    this.fetchUsers();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.fetchUsers();
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

  deleteUser(userId: number): void {
    this.usersDataService.deleteUserById(userId).subscribe(
      () => {
        console.log('User deleted successfully');
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
  clearUsersTable(): void {
    this.usersDataService.clearLocalStorageData();
  }
  // clearUsersTable() {
  //   this.searchText = '';
  //   this.currentPage = 1; // Reset to the first page when clearing the search
  //   this.fetchUsers();
  // }
  private isMatchingSearch(user: User, searchText: string): boolean {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchText.toLowerCase());
  }
}
