import { createAction, props } from '@ngrx/store';
import { UserAccount } from 'src/app/models/bank_account.model';

export const saveUserAccountData = createAction(
  '[User Account] Save Data',
  props<{ accountData: UserAccount }>()
);

export const saveUserAccountDataSuccess = createAction(
  '[User Account] Save Data Success',
  props<{ accountData: UserAccount }>()
);

export const saveUserAccountDataFailure = createAction(
  '[User Account] Save Data Failure',
  props<{ error: any }>()
);
