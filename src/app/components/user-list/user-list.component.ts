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
import { FormBuilder, FormGroup } from '@angular/forms';

const USERS_PER_PAGE = 10;
const PAGE_KEY = 'currentPage';
const SEARCH_KEY = 'searchQuery';

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
  searchForm!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.initializeSubscriptions();
    this.currentPage = parseInt(this.retrieveFromLocalStorage(PAGE_KEY) || '1', 10);

    // Restore search query from local storage
    const storedSearchQuery = this.retrieveFromLocalStorage(SEARCH_KEY);
    this.searchForm = this.fb.group({
      searchQuery: [storedSearchQuery || ''], // Default value is either the stored value or an empty string
    });

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
          if (this.searchForm?.value?.searchQuery) {
            // Apply filter only if there's a search query
            users = this.filterUsers(users);
          }
  
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
    this.saveToLocalStorage(PAGE_KEY, this.currentPage.toString());
    this.saveToLocalStorage(SEARCH_KEY, this.searchForm.value.searchQuery);  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.store.dispatch(fetchUsers());
      localStorage.setItem(PAGE_KEY, this.currentPage.toString());
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

private filterUsers(users: User[]): User[] {
  const lowerCaseQuery = (this.searchForm?.value?.searchQuery || '').toLowerCase();
  return users.filter(user => 
    user.firstName.toLowerCase().includes(lowerCaseQuery) ||
    user.lastName.toLowerCase().includes(lowerCaseQuery)
  );
}


  private saveToLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  private retrieveFromLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  private paginateUsers(users: User[]) {
    const startIndex = (this.currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    this.users.data = users.slice(startIndex, endIndex);
  }
}
