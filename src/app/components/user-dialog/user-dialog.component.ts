import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addUserData } from 'src/app/app.state';
import { User } from 'src/app/models/user.model';
import { UsersDataService } from 'src/app/services/users-data.service';
import { customMobileNumberValidator, customNameValidator, getFirstNameErrorMessage, getLastNameLErrorMessage, getPhoneNumberErrorMessage, getPrivateNumberErrorMessage } from '../utils/userValidators';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private elRef: ElementRef,
    private store: Store,
    private usersDataService: UsersDataService,
    public dialogRef: MatDialogRef<UserDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setFocusOnFirstInput();
    });
  }

  getFirstNameErrorMessage = () => getFirstNameErrorMessage(this.form);
  getLastNameLErrorMessage = () => getLastNameLErrorMessage(this.form);
  getPrivateNumberErrorMessage = () => getPrivateNumberErrorMessage(this.form);
  getPhoneNumberErrorMessage = () => getPhoneNumberErrorMessage(this.form);

  initializeForm(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), customNameValidator]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), customNameValidator]],
      gender: ['', Validators.required],
      privateNumber: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      mobileNumber: ['', [Validators.required, customMobileNumberValidator]],
      countryLegal: ['', Validators.required],
      cityLegal: ['', Validators.required],
      addressLegal: ['', Validators.required],
      countryActual: ['', Validators.required],
      cityActual: ['', Validators.required],
      addressActual: ['', Validators.required],
    });
  }

  setFocusOnFirstInput(): void {
    const firstInput = this.elRef.nativeElement.querySelector('input');
    firstInput?.focus();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const generatedId = this.generateUniqueId();

      const userData: User = {
        id: generatedId,
        ...this.form.value,
      };

      this.usersDataService.addUserData(userData).subscribe(
        (response) => {
          console.log('User added successfully:', response);
          this.store.dispatch(addUserData({ user: response }));
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
    }
  }

  private generateUniqueId(): number {
    return Date.now();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
