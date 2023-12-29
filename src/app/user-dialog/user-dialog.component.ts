import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent {
  message = 'Hello from the dialog!';
  form!: FormGroup;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<UserDialogComponent>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);

      this.dialogRef.close();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
