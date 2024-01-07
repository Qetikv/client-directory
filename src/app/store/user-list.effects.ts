// src/app/store/user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
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
          map((users) => userActions.setUsers({  users })),
          catchError((error) => of(userActions.fetchUsersError({ error })))
        )
      )
    )
  );
}
