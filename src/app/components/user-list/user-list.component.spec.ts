// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatDialog } from '@angular/material/dialog';
// import { UserDialogComponent } from '../user-dialog/user-dialog.component';
// import { MatTableDataSource } from '@angular/material/table';
// import { Store } from '@ngrx/store';
// import { Subject, of } from 'rxjs';
// import { User } from 'src/app/models/user.model';
// import { UserListComponent } from './user-list.component';
// import {
//   AppState,
//   closeDialog,
//   deleteUser,
//   deleteUserSuccess,
//   fetchUsers,
//   selectIsDialogOpen,
//   selectUsers,
// } from 'src/app/app.state';

// describe('UserListComponent', () => {
//   let component: UserListComponent;
//   let fixture: ComponentFixture<UserListComponent>;
//   let mockMatDialog: jasmine.SpyObj<MatDialog>;
//   let mockStore: jasmine.SpyObj<Store<AppState>>;

//   beforeEach(() => {
//     mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
//     mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select']);

//     TestBed.configureTestingModule({
//       declarations: [UserListComponent],
//       providers: [
//         { provide: MatDialog, useValue: mockMatDialog },
//         { provide: Store, useValue: mockStore },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(UserListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize subscriptions on ngOnInit', () => {
//     spyOn(component, 'initializeSubscriptions');
    
//     component.ngOnInit();
    
//     expect(component.initializeSubscriptions).toHaveBeenCalled();
//     expect(mockStore.dispatch).toHaveBeenCalledWith(fetchUsers());
//   });

//   it('should destroy subscriptions on ngOnDestroy', () => {
//     component.ngOnDestroy();
//     expect(component.destroy$.next).toHaveBeenCalled();
//     expect(component.destroy$.complete).toHaveBeenCalled();
//   });

//   // Add more test cases based on your component's functionality

//   afterEach(() => {
//     // Add cleanup logic here if needed
//   });
// });
