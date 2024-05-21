import {Component, inject} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {NgClass, NgIf} from "@angular/common";
import {PasswordModule} from "primeng/password";
import {RouterLink} from "@angular/router";
import {passwordMatchValidator} from "../../../directives/password-matcher.auth";
import {authStore} from "../../../store/authStore";

@Component({
  selector: 'bt-signup',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    ButtonModule,
    RouterLink,
    NgClass,
    NgIf
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm : FormGroup;
  authStore = inject(authStore);

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.signupForm = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      confirmPassword:new FormControl('', [Validators.required, Validators.minLength(5)])
    },{
      validators: passwordMatchValidator
    });
  }

  onSignup() :void {
    this.authStore.onSignup(this.signupForm.getRawValue());
  }

  get emailError() :AbstractControl<any> {
    return this.signupForm.controls['email'];
  }

  get phoneNumberError() :AbstractControl<any> {
    return this.signupForm.controls['phoneNumber'];
  }

  get usernameError() :AbstractControl<any> {
    return  this.signupForm.controls['username'];
  }


  get passwordError() :AbstractControl<any> {
    return  this.signupForm.controls['password'];
  }

  get confirmPasswordError() :AbstractControl<any> {
    return  this.signupForm.controls['confirmPassword'];
  }

  doesPasswordMismatch() : boolean {
    const passwordValid : boolean = !this.passwordError.errors?.['required'] && !this.passwordError.errors?.['minlength'];
    const confirmPasswordValid : boolean = !this.confirmPasswordError.errors?.['required'] && !this.confirmPasswordError.errors?.['minlength'];
    return passwordValid && confirmPasswordValid && this.signupForm.errors?.['passwordMismatch']
  }
}
