import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersDataService } from '../../services/users-data.service';
import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserAccountFormDialogComponent } from '../user-account-form-dialog/user-account-form-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { customMobileNumberValidator, customNameValidator, getFirstNameErrorMessage, getLastNameLErrorMessage, getPhoneNumberErrorMessage, getPrivateNumberErrorMessage } from '../utils/userValidators';
import { Store } from '@ngrx/store';
import { selectUserById, setUser, updateUser } from 'src/app/app.state';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  user: User | undefined;
  userId: number | null = null;
  isEditable = false;
  showUserAccountFormDialog = false;
  form!: FormGroup;


  getFirstNameErrorMessage = () => getFirstNameErrorMessage(this.form);
  getLastNameLErrorMessage = () => getLastNameLErrorMessage((this.form));
  getPrivateNumberErrorMessage = () => getPrivateNumberErrorMessage(this.form);
  getPhoneNumberErrorMessage = () => getPhoneNumberErrorMessage(this.form);

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private store: Store,
  ) {}

  ngOnInit(): void {
  this.route.params.subscribe((params) => {
    this.userId = parseInt(params['id'], 10);
    this.createForm();
    
    // Check if user details are in localStorage, if yes, use them
    const storedUserDetails = localStorage.getItem(`userDetails_${this.userId}`);
    if (storedUserDetails) {
      this.user = JSON.parse(storedUserDetails);
      this.fillUserForm(this.user);
    } else {
      // Fetch user details from the store if not found in localStorage
      this.store.select(selectUserById(this.userId)).subscribe((user) => {
        this.user = user;
        this.fillUserForm(this.user);

        // Save updated user details to localStorage for future use
        localStorage.setItem(`userDetails_${this.userId}`, JSON.stringify(this.user));
      });
    }
  });
}

  createForm(){
    this.form = this.fb.group({
      id:["", [ Validators.required ]],
      firstName: [
        "",
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
    })
  }

  fillUserForm(user: User | undefined) {
    this.user = user;
    if (user) {
      this.form.setValue({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        privateNumber: user.privateNumber,
        mobileNumber: user.mobileNumber,
        addressActual: user.addressActual,
        cityActual: user.cityActual,
        countryActual: user.countryActual,
        addressLegal: user.addressLegal,
        cityLegal: user.cityLegal,
        countryLegal: user.countryLegal
      });
    }
  }

  toggleEditMode(): void {
    this.isEditable = !this.isEditable;
  }

  saveChanges(): void {
    this.store.dispatch(setUser({ user: { ...this.form.value } }));
    this.isEditable = false;
    localStorage.setItem(`userDetails_${this.userId}`, JSON.stringify(this.form.value));
  
    const updatedUser: User = this.form.value;
  
    this.store.dispatch(updateUser({ user: updatedUser }));
  }

  openUserAccountFormDialog(): void {
    const dialogRef = this.dialog.open(UserAccountFormDialogComponent, {
      width: '800px',
      height: '600px',
      data: { user: this.user },
    });
  }
}
