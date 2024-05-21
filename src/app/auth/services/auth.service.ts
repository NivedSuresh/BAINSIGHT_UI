import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Principal} from "../models/admin.model";
import {URI} from "../../shared/constants/bainsight.strings";
import {firstValueFrom} from "rxjs";
import {LoginRequest, SignUpRequest} from "../payloads/auth.request";
import {TokenMeta} from "../payloads/token.meta";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient : HttpClient
  ){}

  public async loginClient(credentials: LoginRequest, isAdmin: boolean) :Promise<Principal>{
    const path :string = this.getPath(isAdmin);
    return firstValueFrom(this.httpClient.post<Principal>(URI.concat(path), credentials, {withCredentials: true}));
  }

  public async logoutUser() : Promise<void> {
    return firstValueFrom(this.httpClient.get<void>(URI.concat("/auth/logout")));
  }

  async validateJwtForPrincipal() : Promise<TokenMeta> {
    return firstValueFrom(this.httpClient.get<TokenMeta>(URI.concat("/auth/validate"), {withCredentials: true}));
  }

  refreshToken(){
    return this.httpClient.get(URI.concat("/auth/refresh"), {withCredentials : true});
  }


  private getPath(isAdmin: boolean) :string{
    return isAdmin ? "/auth/admin/login" : "/auth/client/login";
  }

  async signupClient(signupRequest: SignUpRequest): Promise<Principal> {
    return firstValueFrom(this.httpClient.post<Principal>(URI.concat("/auth/client/signup"), signupRequest));
  }
}
