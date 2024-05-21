import { Injectable } from '@angular/core';
import {PortfolioSymbol} from "../../../shared/models/portfolio-symbol.model";
import {HttpClient} from "@angular/common/http";
import {URI} from "../../../shared/constants/bainsight.strings";
import {firstValueFrom} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {PortfolioStateType} from "../../store/portfolio/portfolio.state";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  async fetchPortfolioSymbols(page: number): Promise<PortfolioStateType> {
    if(!page) page = 1;
    return firstValueFrom(this.http.get<PortfolioStateType>(URI.concat(`/portfolio?page=${page}`), {withCredentials:true}));
  }
}
