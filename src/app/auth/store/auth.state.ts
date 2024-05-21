import {Client} from "../models/client.model";
import {Principal} from "../models/admin.model";

export const ClientState : Client = {
  ucc: '',
  email: '',
  username: '',
  phoneNumber: '',
  isAuthenticated: false
}

export const AuthState : Principal = {
  ucc: '',
  email: '',
  isAuthenticated: false
}




