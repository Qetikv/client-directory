import { UserAccountState } from './store/reducers/bank-account.reducer';

export * from './store/actions/user.action';
export * from './store/reducers/user.reducer';

export interface AppState {
  userAccounts: UserAccountState;
}