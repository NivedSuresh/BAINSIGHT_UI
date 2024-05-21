import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const passwordMatchValidator: ValidatorFn  = (control: AbstractControl) : null | ValidationErrors => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if(!password || !confirmPassword) return null;

  console.log(password.value === confirmPassword.value)
  return password.value === confirmPassword.value ? null : {passwordMismatch: true}
}
