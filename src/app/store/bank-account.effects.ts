import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import * as UserAccountActions from './actions/bank-account.actions';
import { UserAccountService } from '../services/users-account.service';
import { Store } from '@ngrx/store';
import { saveUserAccountData } from './actions/bank-account.actions';

interface AppState {
    userId: string;
  }

@Injectable()
export class UserAccountEffects {
    SaveUserAccountData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAccountActions.saveUserAccountData),
      mergeMap((action) =>
        this.usersAccountService.saveUserAccountData(action.accountData.id,action.accountData).pipe(
          map((addedAcount) => UserAccountActions.saveUserAccountDataSuccess({ accountData: addedAcount })),
          catchError((error) => {
            console.error('Error adding user:', error);
            return throwError(error);
          })
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private usersAccountService: UserAccountService,
    private store: Store 
  ) {}
}