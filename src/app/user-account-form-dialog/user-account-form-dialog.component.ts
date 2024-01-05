import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersDataService } from '../users-data.service';

@Component({
  selector: 'app-user-account-form-dialog',
  templateUrl: './user-account-form-dialog.component.html',
  styleUrls: ['./user-account-form-dialog.component.scss'],
})
export class UserAccountFormDialogComponent implements OnInit {
  accountForm!: FormGroup;
    // Options for dropdowns
    accountTypes = ['current', 'savings', 'accumulation'];
    currencies = ['GEL', 'dollar', 'euro'];
    accountStatusOptions = ['active', 'closed'];

  constructor(
    private fb: FormBuilder,
    private usersDataService: UsersDataService,
    public dialogRef: MatDialogRef<UserAccountFormDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.accountForm = this.fb.group({
      accountNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      customerNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      accountType: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      accountStatus: ['', [Validators.required]],
    });
  }

  save(): void {
    if (this.accountForm.valid) {
      const accountData = this.accountForm.value;

      // Save the user account data to the service and local storage
      this.usersDataService.saveUserAccountData(accountData);

      this.dialogRef.close(accountData);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
