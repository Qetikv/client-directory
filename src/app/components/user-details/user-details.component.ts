// user-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersDataService } from '../../services/users-data.service';
import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserAccountFormDialogComponent } from '../user-account-form-dialog/user-account-form-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { customMobileNumberValidator, customNameValidator, getFirstNameErrorMessage, getLastNameLErrorMessage, getPhoneNumberErrorMessage, getPrivateNumberErrorMessage } from '../utils/userValidators';
import { Store } from '@ngrx/store';
import { selectUSerById } from 'src/app/app.state';
// import { selectUSerById } from 'src/app/app.state';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  user: User | undefined;
  userId: number | null = null;
  isEditable = false; // Track whether the form is in edit mode
  showUserAccountFormDialog = false; // Track whether to show the user account form dialog

  form!: FormGroup;

  getFirstNameErrorMessage = () => getFirstNameErrorMessage(this.form)
  getLastNameLErrorMessage = () => getLastNameLErrorMessage((this.form)) 
  getPrivateNumberErrorMessage = () => getPrivateNumberErrorMessage(this.form)
  getPhoneNumberErrorMessage = () => getPhoneNumberErrorMessage(this.form) 
  
  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private store : Store,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = parseInt(params['userId'], 10);
      this.createForm();
      
      this.store.select(selectUSerById(this.userId)).subscribe((user) => {
          this.user = user;
          this.fillUserForm(this.user);
      })

    });


  }

  createForm(){
    this.form = this.fb.group({
      nId:["", [ Validators.required ]],
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
    if (user) {
      this.form.setValue({
        nId: user.nId,
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
      })
    }
  }

  // Toggle between edit and view mode
  toggleEditMode(): void {
    this.isEditable = !this.isEditable;
  }

  // Save changes to the user object
  saveChanges(): void {
    // Add logic to save changes to the backend or update the local user data
    console.log('Saving changes:', this.user);
    // You can make an HTTP request to update the user data on the server here
    // For simplicity, this example just logs the changes to the console
    this.isEditable = false; // Switch back to view mode after saving
  }

  // Open the user account form dialog
  openUserAccountFormDialog(): void {
    const dialogRef = this.dialog.open(UserAccountFormDialogComponent, {
      width: '600px',
      height: '600px',
      data: { user: this.user }, // Pass user data to the dialog
    });

    //     dialogRef.afterClosed().subscribe((result) => {
    //       if (result) {
    //         // Handle the result (saved data) here if needed
    //         console.log('User Account Form Dialog closed with result:', result);
    //         // Update the user object with the new account data
    //         if (!this.user?.accounts) {
    //           this.user!.accounts = [];
    //         }
    //         this.user!.accounts.push(result);
    //       }
    // // 
    //       this.showUserAccountFormDialog = false;
    //     });
  }
}
