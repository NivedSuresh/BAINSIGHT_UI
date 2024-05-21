import {Route} from "@angular/router";
import {SignupComponent} from "../components/signup/client/signup.component";
import {ClientLoginComponent} from "../components/login/client/client-login.component";
import {AdminLoginComponent} from "../components/login/admin/admin-login.component";

export const authRoutes: Route[] = [
  {
    path: 'admin/login',
    component: AdminLoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: ClientLoginComponent
  }
]
