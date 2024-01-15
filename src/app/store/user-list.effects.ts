import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { UsersDataService } from '../services/users-data.service';
import * as userActions from '../app.state';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private usersDataService: UsersDataService) {}

  fetchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.fetchUsers),
      mergeMap(() =>
        this.usersDataService.fetchUsers().pipe(
          map((users) => userActions.setUsers({ users })),
          catchError((error) => of(userActions.fetchUsersError({ error })))
        )
      )
    )
  );

  addUserData$ = createEffect(() =>
  this.actions$.pipe(
    ofType(userActions.addUserData),
    mergeMap((action) =>
      this.usersDataService.addUserData(action.user).pipe(
        map((addedUser) => userActions.addUserSuccess({ user: addedUser })),
        catchError((error) => {
          console.error('Error adding user:', error);
          return throwError(error);
        })
      )
    )
  )
);

  deleteUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(userActions.deleteUser),
    switchMap(({ id }) =>
      this.usersDataService.deleteUserById(id).pipe(
        map(() => userActions.deleteUser({ id })),
        catchError((error) => of(userActions.deleteUserFailure({ error })))
      )
    )
  )
);

updateUserData$ = createEffect(() =>
  this.actions$.pipe(
    ofType(userActions.updateUser),
    mergeMap((action) =>
      this.usersDataService.updateUserData(action.user).pipe(
        map((updatedUser) => userActions.updateUserSuccess({ user: updatedUser })),
        catchError((error) => {
          console.error('Error updating user:', error);
          return of(userActions.updateUserFailure({ error }));
        })
      )
    )
  )
);
}
