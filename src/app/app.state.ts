// src/app/store/app.state.ts
import { EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on, createAction, createFeatureSelector, createSelector, props } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';

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

export const userAdapter:  EntityAdapter<User> = createEntityAdapter<User>();
export const initialState: AppState = {
  users: userAdapter.getInitialState(),
  isDialogOpen: false,
};

export const openDialog = createAction('[Dialog] Open Dialog');
export const closeDialog = createAction('[Dialog] Close Dialog');
export const setUsers = createAction('[User] Set Users', props<{ users: User[]}>());

export const addUser = createAction('[User] Add User', props<{ user: User }>());
export const fetchUsers = createAction('[User] fetch Users');

// Define other user-related actions similarly

export const appReducer = createReducer(
  initialState,
  on(openDialog, (state) => ({ ...state, isDialogOpen: true })),
  on(closeDialog, (state) => ({ ...state, isDialogOpen: false })),
  on(setUsers, (state, { users }) => ({ ...state, users: userAdapter.setAll(users, state.users) })),

  //   on(addUser, (state, { user }) => userAdapter.addOne(user, { ...state, isDialogOpen: false })),
  // Handle other user-related actions
);

export const {
  selectAll: selectAllUsers,
} = userAdapter.getSelectors((state: AppState) => state.users);

export const selectDialogState = (state: AppState) => state.isDialogOpen;

export const selectFeature = createFeatureSelector<AppState>('Appstate');

export const selectUsers = createSelector(selectFeature, (state) => selectAllUsers(state));
export const selectIsDialogOpen = createSelector(selectFeature, selectDialogState);

// export const fetchUsers = createAction('[User] Fetch Users');
// export const setUsers = createAction('[User] Set Users', (users: User[]) => ({ users }));

export const fetchUsersError = createAction('[User] Fetch Users Error', (error: any) => ({ error }));
