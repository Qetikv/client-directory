// src/app/store/app.state.ts
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, createAction, createFeatureSelector, createSelector, props } from '@ngrx/store';
import * as userActions from './app.state';

export interface User {
  nId: number;
  firstName: string;
  lastName: string;
  gender: string;
  privateNumber: string;
  mobileNumber: string;
  addressActual: string;
  cityActual: string;
  countryActual: string;
  addressLegal: string;
  cityLegal: string;
  countryLegal: string;
}

export interface AppState {
  users: EntityState<User>;
  isDialogOpen: boolean;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.nId,
});
export const initialState: AppState = {
  users: userAdapter.getInitialState(),
  isDialogOpen: false,
};

export const openDialog = createAction('[Dialog] Open Dialog');
export const closeDialog = createAction('[Dialog] Close Dialog');
export const setUsers = createAction('[User] Set Users', props<{ users: User[] }>());
export const fetchUsers = createAction('[User] Fetch Users');
export const fetchUsersError = createAction('[User] Fetch Users Error', props<{ error: any }>());
export const addUserData = createAction('[User] Add User Data', props<{ user: User }>());
export const addUserSuccess = createAction('[User] Add User Success', props<{ user: User }>());
export const addUserFailure = createAction('[User] Add User Failure', props<{ error: any }>());

export const appReducer = createReducer(
  initialState,
  on(openDialog, state => ({ ...state, isDialogOpen: true })),
  on(closeDialog, state => ({ ...state, isDialogOpen: false })),
  on(setUsers, (state, { users }) => ({ ...state, users: userAdapter.setAll(users, state.users) })), 
  on(userActions.addUserSuccess, (state, { user }) => ({ ...state, users: userAdapter.addOne(user, state.users) })),
);


export const {
  selectAll: selectAllUsers,
} = userAdapter.getSelectors((state: AppState) => state.users);

export const selectDialogState = (state: AppState) => state.isDialogOpen;

export const selectFeature = createFeatureSelector<AppState>('appFeature');

export const selectUsers = createSelector(selectFeature, state => selectAllUsers(state));
export const selectIsDialogOpen = createSelector(selectFeature, selectDialogState);

export const selectUSerById = (id: number) =>
    createSelector(selectUsers, (users) => users.find(user => user.nId === id));
