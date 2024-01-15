import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { UserAccount } from '../models/bank_account.model';  // Adjust the import path

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  private apiUrl = 'http://localhost:3000/bank_accounts';

  constructor(private http: HttpClient) {}

  saveUserAccountData(userId: number, accountData: UserAccount): Observable<UserAccount> {
    const userAccountUrl = `${this.apiUrl}?userId=${userId}`;
    return this.http.post<UserAccount>(userAccountUrl, accountData).pipe(
      tap((savedAccount) => {
        console.log('User account data saved successfully:', savedAccount);
      }),
      catchError((error) => {
        console.error('Error saving user account data:', error);
        return throwError(error);
      })
    );
  }
}
