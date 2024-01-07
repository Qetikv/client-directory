import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export const customNameValidator = (control: AbstractControl): ValidationErrors | null => {
    const name = control.value;

    const validCharactersRegex = /^[a-zA-Zა-ჰ\s]+$/;

    if (!validCharactersRegex.test(name)) {
        return { invalidCharacters: true };
    }

    return null;
}

export const customMobileNumberValidator = (control: AbstractControl): ValidationErrors | null => {
    const mobileNumber = control.value;

    const validMobileNumberRegex = /^5\d{8}$/;

    if (!validMobileNumberRegex.test(mobileNumber)) {
        return { invalidMobileNumber: true };
    }

    return null;
}

export const getFirstNameErrorMessage = (form: FormGroup) => {
    return form.get('firstName')?.hasError('required') ? "სახელი აუცილებელია" :
        form.get('firstName')?.hasError('minlength') ? "სახელი უნდა იყოს მინიმუმ 2 სიმბოლო" :
            form.get('firstName')?.hasError('maxlength') ? "სახელი უნდა იყოს მაქსიმუმ 50 სიმბოლოს" :
                form.get('firstName')?.hasError('invalidCharacters') ? "სახელი უნდა შეიცავდეს მხოლოდ ინგლისურ და ქართულ ასოებს" : ""
}

export const getLastNameLErrorMessage = (form: FormGroup) => {
    return form.get('lastName')?.hasError('required') ? "სახელი აუცილებელია" :
        form.get('lastName')?.hasError('minlength') ? "სახელი უნდა იყოს მინიმუმ 2 სიმბოლო" :
            form.get('lastName')?.hasError('maxlength') ? "სახელი უნდა იყოს მაქსიმუმ 50 სიმბოლოს" :
                form.get('lastName')?.hasError('invalidCharacters') ? "სახელი უნდა შეიცავდეს მხოლოდ ინგლისურ და ქართულ ასოებს" : ""
}

export const getPrivateNumberErrorMessage = (form: FormGroup) => {
    return form.get('privateNumber')?.hasError('required') ? "პირადი ნომერი აუცილებელია" :
        form.get('privateNumber')?.hasError('pattern') ? "პირადი ნომერი უნდა იყოს 11 სიმბოლო" : ""
}

export const getPhoneNumberErrorMessage = (form: FormGroup) => {
    return form.get('mobileNumber')?.hasError('required') ? "მობილური ნომერი აუცილებელია" :
        form.get('mobileNumber')?.hasError('invalidMobileNumber') ? "მობილურის ნომერი არასწორია" : ""
}