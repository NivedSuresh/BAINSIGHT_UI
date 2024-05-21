import {HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest, HttpStatusCode} from '@angular/common/http';
import {catchError, switchMap, throwError} from "rxjs";
import {AuthService} from "../../auth/services/auth.service";
import {inject} from "@angular/core";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";


export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authService: AuthService = inject(AuthService);
  const toastr: ToastrService = inject(ToastrService);
  const router:Router = inject(Router);

  req.headers.set("x-auth-user-id", "7d5367d1-1fee-4c54-9622-19e13f770a93");

  req = req.clone({headers: new HttpHeaders().set('x-auth-user-id', '7d5367d1-1fee-4c54-9622-19e13f770a93')})

  console.log(req.headers);

  if(req.url.endsWith("/auth/refresh")){
    return next(req);
  }

  return next(req).pipe(
    catchError((err) => {
      console.log(err.status)
      if(err.status === HttpStatusCode.Forbidden){
        return handle401Error(req, next, err, authService, router, toastr);
      }
      return throwError(() => err);
    })
  )

};


function handle401Error(req: HttpRequest<any>, next: HttpHandlerFn, err: any, authService: AuthService, router: Router, toastr: ToastrService) {
  console.log("Handling 401")
  return authService.refreshToken().pipe(
    switchMap(() => {
      return next(req);
    }),
    catchError((err) => {
      router.navigateByUrl("/login").then();
      toastr.error("Your login session has expired!");
      localStorage.removeItem("role");
      console.log(err.error.message);
      return throwError(() => err);
    })
  );
}




function redirectLogout(){
  console.log("Redirecting to logout");
}



