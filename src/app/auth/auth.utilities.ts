import { decodeJwt } from "jose";
import { AuthState, ExtendedJwtPayload } from "./auth.interface";

export function initialState(): AuthState {
  return {
    token: null,
    isAuthenticated: false,
    user: null,
    isLoading: false,
  };  
}

export function decode(token: string): ExtendedJwtPayload {
  return decodeJwt(token);
}
