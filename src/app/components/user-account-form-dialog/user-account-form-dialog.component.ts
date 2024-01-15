import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersDataService } from '../../services/users-data.service';
import { UserAccount, dropdownOptions } from 'src/app/models/bank_account.model';

@Component({
  selector: 'app-user-account-form-dialog',
  templateUrl: './user-account-form-dialog.component.html',
  styleUrls: ['./user-account-form-dialog.component.scss'],
})
export class UserAccountFormDialogComponent implements OnInit {
  accountForm!: FormGroup;
  accountTypes = dropdownOptions.accountTypes;
  currencies = dropdownOptions.currencies;
  accountStatusOptions = dropdownOptions.accountStatusOptions;

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
      const accountData: UserAccount = this.accountForm.value;

      // this.usersDataService.saveUserAccountData(accountData);

      this.dialogRef.close(accountData);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
