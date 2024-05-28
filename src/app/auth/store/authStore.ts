import {patchState, signalStore, withMethods, withState} from "@ngrx/signals";
import {AuthState} from "./auth.state";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {LoginRequest, SignUpRequest} from "../payloads/auth.request";
import {Principal} from "../models/admin.model";
import {HttpStatusCode} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {TokenMeta} from "../payloads/token.meta";

export const authStore =
  signalStore({providedIn : "root"},
  withState(AuthState),

    withMethods((store,
                 authService : AuthService = inject(AuthService),
                 toastrService: ToastrService = inject(ToastrService),
                 router: Router = inject(Router)
    ) => ({

      async onLogin(credentials: LoginRequest, isAdmin: boolean){
        try{
          const principal: Principal = await authService.loginClient(credentials, isAdmin);
          principal.isAuthenticated = true;
          patchState(store, {...principal});
          toastrService.success("Authentication successful");

          isAdmin ? localStorage.setItem("role", "admin") : localStorage.setItem("role", "client");

          isAdmin ? await router.navigateByUrl("/admin") :
                    await router.navigateByUrl('/');
        }
        catch (exception: any){
          if(exception.status == HttpStatusCode.BadRequest) toastrService.error(exception.error.message);
          if(exception.status === 503) toastrService.error("Service unavailable!");
          else console.log(exception.message, exception.status);
      }},

      async onLogout(){
        try
        {
          await authService.logoutUser();
          patchState(store, {isAuthenticated:false, email: ''});
          toastrService.info("You've been logged out");
          localStorage.removeItem("role");
          await router.navigateByUrl('/auth/login');
        }
        catch (exception: any){
          toastrService.error("Unable to logout");
          return;
        }
      },


      async validateToken(isAdmin: boolean) :Promise<void> {
        try{
          const tokenMeta: TokenMeta = await authService.validateJwtForPrincipal();
          if(isAdmin){
            if(tokenMeta.role !== 'ADMIN'){
              await router.navigateByUrl('/auth/admin/login');
              return;
            }
            console.log(tokenMeta);
            patchState(store, {isAuthenticated:true, email:tokenMeta.email});
            return;
          }
          patchState(store, { isAuthenticated : true, ucc:tokenMeta.ucc })
        }catch (exception:any){
          if(exception.status === HttpStatusCode.Unauthorized){
            try{
              // await authService.refreshToken(req);
            }catch (exception:any){
              if(exception.status === HttpStatusCode.Unauthorized){
                await router.navigateByUrl('/auth/admin/login');
              }
            }
          }
          console.log(exception)
          toastrService.error(exception.message);
          // await router.navigateByUrl('/auth/admin/login');
        }
      },

      async onSignup(signupRequest : SignUpRequest){
        try{
          const principal: Principal = await authService.signupClient(signupRequest);
          principal.isAuthenticated = true;

          patchState(store, {...principal});
          localStorage.setItem("role", "client");

          await router.navigateByUrl('');
          toastrService.success("Authentication successful");
        }catch (exception: any){
          toastrService.error(exception.error.message);
        }
      },

  })),
)
