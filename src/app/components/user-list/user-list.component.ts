import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersDataService } from 'src/app/services/users-data.service';
import { AppState, fetchUsers, openDialog, selectUsers, setUsers } from 'src/app/app.state';

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

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private store: Store<AppState>,
    private usersDataService: UsersDataService
  ) {}

  ngOnInit() {

    // Dispatch the fetchUsers action to initially load users
    this.store.dispatch(fetchUsers());
    
    this.store.select(selectUsers).pipe(takeUntil(this.destroy$)).subscribe(
      (users) => {
        console.log(users)
        // this.userList = users;
        // this.applySearchFilter();
        // this.calculateTotalPages();
        // this.paginateUsers();
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  applySearchFilter() {
    this.users.data = this.userList.filter((user) => this.isMatchingSearch(user, this.searchText));
  }

  applyFilter() {
    this.currentPage = 1;
    // Dispatch the fetchUsers action instead of calling this.fetchUsers()
    this.store.dispatch(fetchUsers());
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateUsers();
    }
  }

  openDialog(): void {
    // Dispatch the openDialog action instead of calling this.openDialog()
    this.store.dispatch(openDialog());
  }

  deleteUser(userId: number): void {
    this.usersDataService.deleteUserById(userId).subscribe(
      () => {
        console.log('User deleted successfully');
        // Dispatch the fetchUsers action instead of calling this.fetchUsers()
        this.store.dispatch(fetchUsers());
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
