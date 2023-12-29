import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDatatableComponent } from './user-datatable.component';

describe('UserDatatableComponent', () => {
  let component: UserDatatableComponent;
  let fixture: ComponentFixture<UserDatatableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDatatableComponent]
    });
    fixture = TestBed.createComponent(UserDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
