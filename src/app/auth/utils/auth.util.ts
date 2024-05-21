import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Injectable} from "@angular/core";


@Injectable({providedIn: "root"})
export class AuthUtil{

  constructor(private formBuilder: FormBuilder) {}

  getLoginFormGroup(entity: string) :FormGroup {
    return new FormGroup({
      identifier: new FormControl("", [Validators.required, entity === 'admin' ? Validators.email : Validators.minLength(10)]),
      password: new FormControl("", [Validators.required, Validators.minLength(5)])
    })
  }


  getIdentifierError(loginForm: FormGroup<any>, type: string): string | undefined {
    const status = loginForm.controls['identifier'];
    return status.touched && (status.invalid || status.dirty) ?
      `The user identifier is invalid, please enter a valid ${type}` :
      undefined;
  }

  getPasswordError(loginForm: FormGroup<any>): string | undefined  {
    const status = loginForm.controls['password'];
    return status.touched && (status.invalid || status.dirty) ?
      'Password should be of minimum 5 characters' :
      undefined;
  }

}
