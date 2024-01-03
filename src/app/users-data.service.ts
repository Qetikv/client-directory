import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  private users: User[] = this.loadUsersFromLocalStorage();
  private usersSubject = new BehaviorSubject<User[]>(this.users);

  users$: Observable<User[]> = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}

  private loadUsersFromLocalStorage(): User[] {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  }

  private saveUsersToLocalStorage(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
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
    return this.http.get<User[]>('http://localhost:3000/api/users').pipe(
      catchError((error) => {
        console.error('Error fetching users:', error);
        return throwError(error);
      })
    );
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
}
