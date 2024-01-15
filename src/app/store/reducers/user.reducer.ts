import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as userActions from '../actions/user.action';
import { User } from 'src/app/models/user.model';

// The overall structure of the application state
export interface AppState {
  users: EntityState<User>;
  isDialogOpen: boolean;
  searchText: string;
}

//entity adapter for managing users
export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.id,
});

// Initial state for the application
export const initialState: AppState = {
  users: userAdapter.getInitialState(),
  isDialogOpen: false,
  searchText: '',
};

export const appReducer = createReducer(
  initialState,
  // Reducer cases for various actions
  on(userActions.openDialog, (state) => ({ ...state, isDialogOpen: true })),
  on(userActions.closeDialog, (state) => ({ ...state, isDialogOpen: false })),
  on(userActions.setSearchText, (state, { searchText }) => ({ ...state, searchText })),
  on(userActions.setUsers, (state, { users }) => ({ ...state, users: userAdapter.setAll(users, state.users) })),
  on(userActions.addUserSuccess, (state, { user }) => ({ ...state, users: userAdapter.setOne(user, state.users) })),
  on(userActions.deleteUser, (state, { id }) => ({ ...state, users: userAdapter.removeOne(id, state.users) })),
  on(userActions.setUser, (state, { user }) => ({ ...state, user })),
  on(userActions.deleteUserSuccess, (state, { id }) => ({ ...state, users: userAdapter.removeOne(id, state.users) })),
  on(userActions.deleteUserFailure, (state, { error }) => state),
  on(userActions.setSearchResults, (state, { users }) => ({ ...state, users: userAdapter.setAll(users, state.users) })),
  on(userActions.searchError, (state) => ({ ...state, users: userAdapter.removeAll(state.users) }))
);

//selectors for use in components or effects
export const { selectAll: selectAllUsers } = userAdapter.getSelectors((state: AppState) => state.users);
export const selectDialogState = (state: AppState) => state.isDialogOpen;
export const selectFeature = createFeatureSelector<AppState>('appFeature');
export const selectUsers = createSelector(selectFeature, state => selectAllUsers(state));
export const selectIsDialogOpen = createSelector(selectFeature, selectDialogState);
export const selectUserById = (id: number) => createSelector(selectUsers, (users) => users.find(user => user.id === id));
export const selectUserState = createFeatureSelector<User>('user');
export const selectUser = createSelector(selectUserState, (state) => state.id);

