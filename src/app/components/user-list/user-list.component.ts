import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import {
  AppState,
  closeDialog,
  deleteUser,
  deleteUserSuccess,
  fetchUsers,
  selectIsDialogOpen,
  selectUsers
} from 'src/app/app.state';

const USERS_PER_PAGE = 10;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: MatTableDataSource<User> = new MatTableDataSource<User>();
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'gender', 'delete', 'edit'];
  isDialogOpen = false;
  currentPage = 1;
  totalPages = 1;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeSubscriptions();
    this.store.dispatch(fetchUsers());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeSubscriptions() {
    this.store
      .select(selectUsers)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (users) => {
          this.calculateTotalPages(users);
          this.paginateUsers(users);
        },
        (error) => console.error('Error fetching users:', error)
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

  openUserDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '800px',
      height: '600px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.store.dispatch(closeDialog());
    });
  }

  applyFilter() {
    this.currentPage = 1;
    this.store.dispatch(fetchUsers());
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.store.dispatch(fetchUsers());
    }
  }

  confirmDelete(id: number, event: Event): void {
    event.stopPropagation();
    const isConfirmed = window.confirm('დარწმუნებული ხართ რომ გსურთ კლიენტის წაშლა?');
    if (isConfirmed) {
      this.store.dispatch(deleteUser({ id }));
    }
  }

  private calculateTotalPages(users: User[]) {
    this.totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  }

  private paginateUsers(users: User[]) {
    const startIndex = (this.currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    this.users.data = users.slice(startIndex, endIndex);
  }
}
