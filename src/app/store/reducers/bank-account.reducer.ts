// user-account.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as userAccountActions from '../actions/bank-account.actions';
import { UserAccount } from 'src/app/models/bank_account.model';

export interface UserAccountState {
  userAccounts: UserAccount[];
}

export const initialState: UserAccountState = {
  userAccounts: [],
};

export const userAccountReducer = createReducer(
  initialState,
  on(userAccountActions.addUserAccount, (state, { account }) => ({
    ...state,
    userAccounts: [...state.userAccounts, account],
  }))
);
