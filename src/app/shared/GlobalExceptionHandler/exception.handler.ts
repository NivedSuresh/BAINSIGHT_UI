import {ErrorHandler, inject, Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandler implements ErrorHandler {

  handleError(error: any): void {
    // Log the error to the console.

    const toastr = inject(ToastrService);

    console.error(error);

    toastr.error(error.error.message);
  }
}
