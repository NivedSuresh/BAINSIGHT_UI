import {Component, inject} from '@angular/core';
import {CardModule} from "primeng/card";
import {AuthUtil} from "../../../utils/auth.util";
import {InputTextModule} from "primeng/inputtext";
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";
import {JsonPipe, NgClass, NgIf} from "@angular/common";
import {authStore} from "../../../store/authStore";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    ButtonModule,
    RouterLink,
    NgClass,
    NgIf,
    JsonPipe
  ],
  templateUrl: './client-login.component.html',
  styleUrl: './client-login.component.css'
})
export class ClientLoginComponent {

  loginForm:FormGroup;
  authStore = inject(authStore);

  constructor(
    private authUtil :AuthUtil,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.authUtil.getLoginFormGroup('client');
  }

  async onLogin() {
    await this.authStore.onLogin(this.loginForm.getRawValue(), false);
  }

  get identifierError() :AbstractControl<any>{
    return this.loginForm.controls['identifier'];
  }

  get passwordError(): AbstractControl<any>{
    return this.loginForm.controls['password'];
  }

}
