// // user-account.effects.ts
// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { catchError, map, mergeMap } from 'rxjs/operators';
// import { of } from 'rxjs';
// import { UsersDataService } from '../services/users-data.service';
// import * as userAccountActions from './actions/bank-account.actions'

// @Injectable()
// export class UserAccountEffects {
//   addUserAccount$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(userAccountActions.addUserAccount),
//       mergeMap((action) =>
//         this.usersDataService.saveUserAccountData(action).pipe(
//           map(() => {
        
//           }),
//           catchError(() => of(userAccountActions.addUserAccountFailure()))
//         )
//       )
//     )
//   );

//   constructor(private actions$: Actions, private usersDataService: UsersDataService) {}
// }
