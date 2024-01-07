import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  private users: User[] = this.loadUsersFromLocalStorage();
  private usersSubject = new BehaviorSubject<User[]>(this.users);
  currentPage: number = 1;
  usersPerPage: number = 2;
  totalPages: number = 1;
  searchText = '';

  users$: Observable<User[]> = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}

  private loadUsersFromLocalStorage(): User[] {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  }

  private saveUsersToLocalStorage(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  saveUserAccountData(accountData: any): void {
    console.log('Saving user account data:', accountData);
    const storedAccounts = localStorage.getItem('userAccounts');
    const accounts = storedAccounts ? JSON.parse(storedAccounts) : [];
    accounts.push(accountData);
    localStorage.setItem('userAccounts', JSON.stringify(accounts));
  }

  addUserData(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/api/users', user).pipe(
      tap((addedUser) => {
        this.users = [...this.users, addedUser];
        this.saveUsersToLocalStorage(this.users);
        this.usersSubject.next([...this.users]);
      })
    );
  }

  fetchUsers(): Observable<User[]> {
    console.log('Fetching users...');
    const params = {
      search: this.searchText || '',
      page: this.currentPage.toString(),
      limit: this.usersPerPage.toString(),
    };
    return this.http.get<User[]>('http://localhost:3000/api/users', { params }).pipe(
      catchError((error) => {
        console.error('Error fetching users:', error);
        return throwError(error);
      })
    );
  }
  getUserAccounts(userId: number): any[] {
    console.log('Fetching user accounts for user with ID:', userId);

    const storedAccounts = localStorage.getItem('userAccounts');
    return storedAccounts ? JSON.parse(storedAccounts) : [];
  }

  getUsers(): User[] {
    return this.users;
  }

  clearLocalStorageData(): void {
    localStorage.removeItem('users');
    this.users = [];
    this.usersSubject.next([]);
  }
  deleteUserById(userId: number): Observable<void> {
    const apiUrl = `http://localhost:3000/api/users/${userId}`;
    return this.http.delete<void>(apiUrl).pipe(
      tap(() => {
        // Update the local users array
        this.users = this.users.filter(user => user.nId !== userId);
        // Save the updated users to local storage
        this.saveUsersToLocalStorage(this.users);
        // Notify subscribers about the change
        this.usersSubject.next([...this.users]);
      }),
      catchError((error) => {
        console.error('Error deleting user:', error);
        return throwError(error);
      })
    );
  }

  updateUser(userId: number, updatedUser: User): Observable<User> {
    const apiUrl = `http://localhost:3000/api/users/${userId}`;
    return this.http.put<User>(apiUrl, updatedUser).pipe(
      tap((user) => {
      }),
      catchError((error) => {
        console.error('Error updating user:', error);
        return throwError(error);
      })
    );
  }

  getUserById(userId: number): User | undefined {
    return this.users.find((user) => user.nId === userId);
  }
}