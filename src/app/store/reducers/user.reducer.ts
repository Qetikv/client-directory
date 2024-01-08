import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as userActions from '../actions/user.action';
import { User } from 'src/app/models/user.model';

export interface AppState {
    users: EntityState<User>;
    isDialogOpen: boolean;
    searchText: string;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
    selectId: (user: User) => user.nId,
});

export const initialState: AppState = {
    users: userAdapter.getInitialState(),
    isDialogOpen: false,
    searchText: '',
};

export const appReducer = createReducer(
    initialState,
    on(userActions.openDialog, (state) => ({ ...state, isDialogOpen: true })),
    on(userActions.closeDialog, (state) => ({ ...state, isDialogOpen: false })),
    on(userActions.setSearchText, (state, { searchText }) => ({ ...state, searchText })),
    on(userActions.setUsers, (state, { users }) => ({ ...state, users: userAdapter.setAll(users, state.users) })),
    on(userActions.addUserSuccess, (state, { user }) => ({ ...state, users: userAdapter.addOne(user, state.users) })),
    on(userActions.setSearchText, (state, { searchText }) => ({ ...state, searchText })),
    on(userActions.setSearchResults, (state, { users }) => ({ ...state, searchResults: users, searchError: null })),
    on(userActions.searchError, (state, { error }) => ({ ...state, searchResults: [], searchError: error }))
  );

export const { selectAll: selectAllUsers } = userAdapter.getSelectors((state: AppState) => state.users);
export const selectDialogState = (state: AppState) => state.isDialogOpen;
export const selectFeature = createFeatureSelector<AppState>('appFeature');
export const selectUsers = createSelector(selectFeature, state => selectAllUsers(state));
export const selectIsDialogOpen = createSelector(selectFeature, selectDialogState);
export const selectUserById = (id: number) => createSelector(selectUsers, (users) => users.find(user => user.nId === id));
export const selectUserState = createFeatureSelector<AppState, AppState>('searchText');

export const selectSearchText = createSelector(
  selectUserState,
  (state) => state.searchText
);

export const selectFilteredUsers = createSelector(
    selectUsers,
    selectSearchText,
    (users, searchText) => {
      return users.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        return fullName.includes(searchText.toLowerCase());
      });
    }
  );