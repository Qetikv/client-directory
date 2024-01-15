import { createReducer, on } from '@ngrx/store';
import * as UserAccountActions from '../actions/bank-account.actions';
import { UserAccount } from 'src/app/models/bank_account.model';

export interface UserAccountState {
  data: UserAccount | null;
  error: any;
}

export const initialState: UserAccountState = {
  data: null,
  error: null,
};

export const userAccountReducer = createReducer(
  initialState,

  on(UserAccountActions.saveUserAccountDataSuccess, (state, { accountData }) => {
    return { ...state, data: accountData, error: null };
  }),

  on(UserAccountActions.saveUserAccountDataFailure, (state, { error }) => {
    return { ...state, data: null, error };
  })
);
