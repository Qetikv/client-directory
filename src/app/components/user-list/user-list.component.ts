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
import { AppState, closeDialog, fetchUsers, openDialog, selectIsDialogOpen, selectUsers, setUsers } from 'src/app/app.state';

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
  isDialogOpen!: boolean;

  currentPage: number = 1;
  usersPerPage: number = 10;
  totalPages: number = 1;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private store: Store<AppState>,
    private usersDataService: UsersDataService
  ) { }

  ngOnInit() {
    this.store.dispatch(fetchUsers());

    this.store
      .select(selectUsers)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (users) => {
          console.log(users);
          this.userList = users;
          this.applySearchFilter();
          this.calculateTotalPages();
          this.paginateUsers();
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );

    this.store
      .select(selectIsDialogOpen)
      .pipe(takeUntil(this.destroy$))
      .subscribe((isDialogOpen) => {
        this.isDialogOpen = isDialogOpen;

        if (isDialogOpen) {
          this.openUserDialog();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private openUserDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '800px',
      height: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.store.dispatch(closeDialog());
    });
  }

  applySearchFilter() {
    this.users.data = this.userList.filter((user) =>
      this.isMatchingSearch(user, this.searchText)
    );

    this.calculateTotalPages();
    this.paginateUsers();
  }

  applyFilter() {
    this.currentPage = 1;
    this.store.dispatch(fetchUsers());
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateUsers();
    }
  }

  openDialog(): void {
    this.store.dispatch(openDialog());
  }

  // deleteUser(userId: number): void {
  //   this.store.dispatch(deleteUser({ userId }));
  // }

  redirectToDetailsPage(userId: number): void {
    this.router.navigate(['/details', userId]);
  }

  confirmDelete(userId: number, event: Event): void {
    event.stopPropagation();
    const isConfirmed = window.confirm('დარწმუნებული ხართ რომ გსურთ კლიენტის წაშლა?');
    if (isConfirmed) {
      // this.deleteUser(userId);
    }
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
