import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserDetailsPageComponent } from './edit-user-details-page.component';

describe('EditUserDetailsPageComponent', () => {
  let component: EditUserDetailsPageComponent;
  let fixture: ComponentFixture<EditUserDetailsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditUserDetailsPageComponent]
    });
    fixture = TestBed.createComponent(EditUserDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
