import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { User } from '../user.model';
import { UsersDataService } from '../users-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  userList: User[] = [];
  users: User[] = [];
  displayedColumns: string[] = ['nId', 'firstName', 'lastName', 'gender', 'delete', 'edit'];
  searchText: string = '';

  currentPage: number = 1;
  usersPerPage: number = 2;
  totalPages: number = 1;

  constructor(
    private dialog: MatDialog,
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

  redirectToDetailsPage(userId: number): void {
    this.router.navigate(['edit', userId]);
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
    this.users = this.userList.filter((user) => this.isMatchingSearch(user, this.searchText));
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

  private isMatchingSearch(user: User, searchText: string): boolean {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchText.toLowerCase());
  }
}
