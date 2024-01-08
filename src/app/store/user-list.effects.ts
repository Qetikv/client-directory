// src/app/store/user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsersDataService } from '../services/users-data.service';
import * as userActions from '../app.state';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private usersDataService: UsersDataService
  ) {}

  fetchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.fetchUsers),
      mergeMap(() =>
        this.usersDataService.fetchUsers().pipe(
          map(users => userActions.setUsers({ users })),
          catchError(error => of(userActions.fetchUsersError({ error })))
        )
      )
    )
  );
  setSearchText$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.setSearchText),
      switchMap(({ searchText }) =>
        this.usersDataService.fetchUsers().pipe(
          map((users) => userActions.setSearchResults({ users })),
          catchError((error) => of(userActions.searchError({ error })))
        )
      )
    )
  );
  addUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(userActions.addUserData),
    mergeMap((action) =>
      this.usersDataService.addUserData(action.user).pipe(
        map((user) => userActions.addUserSuccess({ user })),
        catchError((error) => of(userActions.addUserFailure({ error })))
      )
    )
  )
);
  
}
