import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { addUserSuccess, setSearchResults, fetchUsersError, deleteUserSuccess, deleteUser } from '../app.state';

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  private usersSubject = new BehaviorSubject<User[]>([]);

  users$: Observable<User[]> = this.usersSubject.asObservable();
    private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private store: Store) {}

  addUserData(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/users', user).pipe(
      tap((addedUser) => {
        this.usersSubject.next([...this.usersSubject.value, addedUser]);
        this.store.dispatch(addUserSuccess({ user: addedUser }));
      }),
      catchError((error) => {
        console.error('Error adding user:', error);
        return throwError(error);
      })
    );
  }
  
  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users').pipe(
      tap((users) => {
        this.usersSubject.next(users);
        this.store.dispatch(setSearchResults({ users }));
      }),
      catchError((error) => {
        console.error('Error fetching users:', error);
        this.store.dispatch(fetchUsersError({ error }));
        return throwError(error);
      })
    );
  }

  deleteUserById(id: number): Observable<User> {
    const apiUrl = `http://localhost:3000/users/${id}`;
    return this.http.delete<User>(apiUrl).pipe(
      tap((deleted) => {
        this.usersSubject.next([...this.usersSubject.value, deleted]);
        this.store.dispatch(deleteUserSuccess({ id }));
        console.log(`User with ID ${id} deleted successfully`);
      }),
      catchError((error) => {
        console.error(`Error deleting user with ID ${id}:`, error);
        return throwError(error);
      })
    );
  }
}
