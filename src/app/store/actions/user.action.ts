import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

// Dialog actions
export const openDialog = createAction('[Dialog] Open Dialog');
export const closeDialog = createAction('[Dialog] Close Dialog');

// User actions
export const setUsers = createAction('[User] Set Users', props<{ users: User[] }>());
export const setUser = createAction('[User] Set User', props<{ user: User }>());

export const fetchUsers = createAction('[User] Fetch Users');
export const fetchUsersError = createAction('[User] Fetch Users Error', props<{ error: any }>());

export const addUserData = createAction('[User] Add User Data', props<{ user: User }>());
export const addUserSuccess = createAction('[User] Add User Success', props<{ user: User }>());
export const addUserFailure = createAction('[User] Add User Failure', props<{ error: any }>());

export const deleteUser = createAction('[User] Delete User', props<{ id: number }>());
export const deleteUserSuccess = createAction('[User] Delete User Success', props<{ id: number }>());
export const deleteUserFailure = createAction('[User] Delete User Failure', props<{ error: any }>());

export const setSearchText = createAction('[User] Set Search Text', props<{ searchText: string }>());
export const setSearchResults = createAction('[User] Set Search Results', props<{ users: User[] }>());
export const searchError = createAction('[User] Search Error', props<{ error: any }>());
