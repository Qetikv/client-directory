// user-account.actions.ts
import { createAction, props } from '@ngrx/store';
import { UserAccount } from 'src/app/models/bank_account.model';

export const addUserAccount = createAction('[User Account] Add', props<{ account: UserAccount }>());
export const addUserAccountSuccess = createAction('[User Account] Add');

export const addUserAccountFailure = createAction('[User Account] Add Failure');
