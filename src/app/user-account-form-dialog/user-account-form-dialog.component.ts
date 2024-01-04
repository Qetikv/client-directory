import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

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
      this.dialogRef.close(accountData);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
