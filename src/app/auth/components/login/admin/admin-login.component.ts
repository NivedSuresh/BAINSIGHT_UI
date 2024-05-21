import {Component, inject} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {AsyncPipe, CommonModule, JsonPipe, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {PasswordModule} from "primeng/password";
import {AbstractControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {AuthUtil} from "../../../utils/auth.util";
import {LoginRequest} from "../../../payloads/auth.request";
import {authStore} from "../../../store/authStore";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    NgIf,
    PaginatorModule,
    PasswordModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    JsonPipe,
    AsyncPipe
  ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  loginForm: FormGroup;
  private store;

  constructor(private authUtil :AuthUtil) {
    this.loginForm = authUtil.getLoginFormGroup("admin");
    this.store = inject(authStore);
  }

  async onLogin() {
    const loginRequest: LoginRequest = this.loginForm.getRawValue();
    await this.store.onLogin(loginRequest, true);
  }

  get identifierError() :AbstractControl<any>{
    return this.loginForm.controls['identifier'];
  }

  get passwordError(): AbstractControl<any>{
    return this.loginForm.controls['password'];
  }

}
