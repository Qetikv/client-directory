import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addUserData } from 'src/app/app.state';
import { User } from 'src/app/models/user.model';
import { UsersDataService } from 'src/app/services/users-data.service';

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
    private store: Store,
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
          this.customNameValidator
        ]
      ],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        this.customNameValidator
      ]],
      gender: ['', Validators.required],
      privateNumber: ['', [
        Validators.required, Validators.pattern(/^\d{11}$/)],
      ],
      mobileNumber: ['', [
        Validators.required, this.customMobileNumberValidator]
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

  private customNameValidator(control: AbstractControl): ValidationErrors | null {
    const name = control.value;

    const validCharactersRegex = /^[a-zA-Zა-ჰ\s]+$/;

    if (!validCharactersRegex.test(name)) {
      return { invalidCharacters: true };
    }

    return null;
  }

  private customMobileNumberValidator(control: AbstractControl): ValidationErrors | null {
    const mobileNumber = control.value;

    const validMobileNumberRegex = /^5\d{8}$/;

    if (!validMobileNumberRegex.test(mobileNumber)) {
      return { invalidMobileNumber: true };
    }

    return null;
  }

  private createAddressGroup() {
    return this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  getFirstNameErrorMessage() {
    return this.form.get('firstName')?.hasError('required') ? "სახელი აუცილებელია" :
      this.form.get('firstName')?.hasError('minlength') ? "სახელი უნდა იყოს მინიმუმ 2 სიმბოლო" :
        this.form.get('firstName')?.hasError('maxlength') ? "სახელი უნდა იყოს მაქსიმუმ 50 სიმბოლოს" :
          this.form.get('firstName')?.hasError('invalidCharacters') ? "სახელი უნდა შეიცავდეს მხოლოდ ინგლისურ და ქართულ ასოებს" : ""
  }

  getLastNameLErrorMessage() {
    return this.form.get('lastName')?.hasError('required') ? "სახელი აუცილებელია" :
      this.form.get('lastName')?.hasError('minlength') ? "სახელი უნდა იყოს მინიმუმ 2 სიმბოლო" :
        this.form.get('lastName')?.hasError('maxlength') ? "სახელი უნდა იყოს მაქსიმუმ 50 სიმბოლოს" :
          this.form.get('lastName')?.hasError('invalidCharacters') ? "სახელი უნდა შეიცავდეს მხოლოდ ინგლისურ და ქართულ ასოებს" : ""
  }
  getPrivateNumberErrorMessage() {
    return this.form.get('privateNumber')?.hasError('required') ? "პირადი ნომერი აუცილებელია" :
      this.form.get('privateNumber')?.hasError('pattern') ? "პირადი ნომერი უნდა იყოს 11 სიმბოლო" : ""
  }

  getPhoneNumberErrorMessage() {
    return this.form.get('mobileNumber')?.hasError('required') ? "მობილური ნომერი აუცილებელია" :
      this.form.get('mobileNumber')?.hasError('invalidMobileNumber') ? "მობილურის ნომერი არასწორია" : ""
  }
  onSubmit(): void {
    if (this.form.valid) {
      const userData: User = {
        nId: this.generateUniqueId(),
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
