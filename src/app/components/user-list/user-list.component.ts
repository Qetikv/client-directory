import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { User } from '../../models/user.model';
import { UsersDataService } from '../../services/users-data.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  userList: User[] = [];
  users: MatTableDataSource<User> = new MatTableDataSource<User>();
  displayedColumns: string[] = ['nId', 'firstName', 'lastName', 'gender', 'delete', 'edit'];
  searchText: string = '';

  currentPage: number = 1;
  usersPerPage: number = 10;
  totalPages: number = 1;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private usersDataService: UsersDataService
  ) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.usersDataService.users$.subscribe(
      (users) => {
        this.userList = users;
        this.applySearchFilter();
        this.calculateTotalPages();
        this.paginateUsers();
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  applySearchFilter() {
    this.users.data = this.userList.filter((user) => this.isMatchingSearch(user, this.searchText));
  }

  applyFilter() {
    this.currentPage = 1;
    this.fetchUsers();
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateUsers();
    }
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
        this.fetchUsers();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  redirectToDetailsPage(userId: number): void {
    this.router.navigate(['/details', userId]);
  }

  private isMatchingSearch(user: User, searchText: string): boolean {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchText.toLowerCase());
  }

  private calculateTotalPages() {
    this.totalPages = Math.ceil(this.userList.length / this.usersPerPage);
  }

  private paginateUsers() {
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    const endIndex = startIndex + this.usersPerPage;
    this.users.data = this.userList.slice(startIndex, endIndex);
  }
}
