import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<UserDialogComponent>) { }

  ngOnInit(): void {
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
      privateNumber: ['',[
        Validators.required, Validators.pattern(/^\d{11}$/)],
      ],
      mobileNumber: ['',[
        Validators.required, this.customMobileNumberValidator],
      ],

    });
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
