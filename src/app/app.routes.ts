import {CanActivateFn, Router, Routes} from '@angular/router';
import {inject} from "@angular/core";
import {ToastrService} from "ngx-toastr";
import {HistoryComponent} from "./client/components/history/history.component";

export const canActivateGuard :CanActivateFn = (route, state) => {

  const toastrService = inject(ToastrService);
  const router = inject(Router);


  const role = localStorage.getItem("role");
  const isAllowed = <boolean>(state.url.startsWith("/admin") ? role  === 'admin': role === 'client');

  /* TODO: Uncomment before hosting/after testing! */
  if(!isAllowed) router.navigateByUrl("/auth/login").then(r => toastrService.error("Login before trying again!"));
  console.log(isAllowed);
  return isAllowed;
}

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>  import("./auth/routes/auth.routes").then(m => m.authRoutes),
  },
  {
    path:'admin',
    loadChildren: () => import("./admin/routes/adminRoutes").then(m => m.adminRoutes),
    canActivate: [canActivateGuard]
  },
  {
    path: 'history/:symbol/:timeSpace',
    component: HistoryComponent,
    canActivate: [canActivateGuard]
  },
  {
    path: '',
    loadChildren: () => import('./client/routes/client.routes').then(m => m.clientRoutes),
    canActivate: [canActivateGuard]
  }
];
