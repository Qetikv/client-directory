import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const openDialog = createAction('[Dialog] Open Dialog');
export const closeDialog = createAction('[Dialog] Close Dialog');
export const setUsers = createAction('[User] Set Users', props<{ users: User[] }>());
export const fetchUsers = createAction('[User] Fetch Users');
export const fetchUsersError = createAction('[User] Fetch Users Error', props<{ error: any }>());
export const addUserData = createAction('[User] Add User Data', props<{ user: User }>());
export const addUserSuccess = createAction('[User] Add User Success', props<{ user: User }>());
export const addUserFailure = createAction('[User] Add User Failure', props<{ error: any }>());

export const setSearchText = createAction('[User] Set Search Text', props<{ searchText: string }>());
export const setSearchResults = createAction('[User] Set Search Results', props<{ users: User[] }>());
export const searchError = createAction('[User] Search Error', props<{ error: any }>());
