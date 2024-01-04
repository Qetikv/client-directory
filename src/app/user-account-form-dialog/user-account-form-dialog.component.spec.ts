import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountFormDialogComponent } from './user-account-form-dialog.component';

describe('UserAccountFormDialogComponent', () => {
  let component: UserAccountFormDialogComponent;
  let fixture: ComponentFixture<UserAccountFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAccountFormDialogComponent]
    });
    fixture = TestBed.createComponent(UserAccountFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
