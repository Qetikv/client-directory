import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

  constructor(private fb: FormBuilder,
    private elRef: ElementRef,
    private usersDataService: UsersDataService,
    public dialogRef: MatDialogRef<UserDialogComponent>) { }


  ngOnInit(): void {
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setFocusOnFirstInput();
    });
  }

  initializeForm(): void {
    this.form = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          customNameValidator
        ]
      ],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        customNameValidator
      ]],
      gender: ['', Validators.required],
      privateNumber: ['', [
        Validators.required, Validators.pattern(/^\d{11}$/)],
      ],
      mobileNumber: ['', [
        Validators.required, customMobileNumberValidator]
      ],
      countryLegal: ['', Validators.required],
      cityLegal: ['', Validators.required],
      addressLegal: ['', Validators.required],
      countryActual: ['', Validators.required],
      cityActual: ['', Validators.required],
      addressActual: ['', Validators.required],
      // legalAddress: this.createAddressGroup(),
      // actualAddress: this.createAddressGroup()
    });
  }

  setFocusOnFirstInput(): void {
    const firstInput = this.elRef.nativeElement.querySelector('input');
    if (firstInput) {
      firstInput.focus();
    }
  }

  private createAddressGroup() {
    return this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
    });
  }


  getFirstNameErrorMessage = () => getFirstNameErrorMessage(this.form)
  getLastNameLErrorMessage = () => getLastNameLErrorMessage((this.form)) 
  getPrivateNumberErrorMessage = () => getPrivateNumberErrorMessage(this.form)
  getPhoneNumberErrorMessage = () => getPhoneNumberErrorMessage(this.form)

  
  onSubmit(): void {
    if (this.form.valid) {
      const userData: User = {
        nId: this.generateUniqueId(),
        ...this.form.value,
      };

      // Make the HTTP POST request to save user data to the backend
      this.usersDataService.addUserData(userData).subscribe(
        (response) => {
          console.log('User added successfully:', response);
          this.usersDataService.addUserData(response);
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
