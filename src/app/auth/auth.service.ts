import { HttpClient } from "@angular/common/http";
import { effect, inject, Injectable } from "@angular/core";
import { patchState, signalState } from '@ngrx/signals';
import { firstValueFrom } from "rxjs";
import { API_URL } from "../app.constants";
import { UserService } from "../domains/users/user.service";
import { HttpResponse } from "../shared/interfaces/http.interface";
import { StorageService } from "../shared/services/storage.service";
import { AuthState, CreateAccountRequestBody, LoginRequestBody, Token } from "./auth.interface";
import { decode, initialState } from "./auth.utilities";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storage = inject(StorageService);
  private http = inject(HttpClient);
  private userService = inject(UserService);

  state = signalState<AuthState>(initialState());

  onStateChange = effect(() => console.log('AuthState', this.state()));
  
  async initialize(): Promise<void> {
    const token = this.storage.get('token');

    if (token) {
      try {
        patchState(this.state, { isLoading: true });

        const userId = decode(token).userId;
        const userResponse = await firstValueFrom(this.userService.findById(userId));
    
        if (userResponse.errored) throw new Error(userResponse.message);
    
        patchState(this.state, {
          token,
          user: userResponse.payload,
          isAuthenticated: true,
          isLoading: false,
        });
      }
      catch (e) {
        this.storage.remove('token');
        patchState(this.state, initialState());
        console.log(e);

        if (e.error.message === 'jwt expired') {
          alert('Your session has been expired');
        }
      }
    }
  }

  async login(body: LoginRequestBody): Promise<void> {
    try {
      patchState(this.state, { isLoading: true });

      const authResponse = await firstValueFrom(
        this.http.post<HttpResponse<Token>>(`${API_URL}/auth/login`, body),
      );
      
      if (authResponse.errored) throw new Error(authResponse.message);
  
      this.storage.set('token', authResponse.payload);
  
      const userId = decode(authResponse.payload).userId;
      const userResponse = await firstValueFrom(this.userService.findById(userId));
  
      if (userResponse.errored) throw new Error(userResponse.message);
  
      patchState(this.state, {
        token: authResponse.payload,
        user: userResponse.payload,
        isLoading: false,
        isAuthenticated: true,
      });
    }
    catch (e) {
      patchState(this.state, initialState());
      console.log(e);
    }
  }

  async createAccount(body: CreateAccountRequestBody): Promise<void> {
    try {
      patchState(this.state, { isLoading: true });

      const authResponse = await firstValueFrom(
        this.http.post<HttpResponse<Token>>(`${API_URL}/auth/create-account`, body),
      );
      
      if (authResponse.errored) throw new Error(authResponse.message);
      
      this.storage.set('token', authResponse.payload);
  
      const userId = decode(authResponse.payload).userId;
      const userResponse = await firstValueFrom(this.userService.findById(userId));
  
      if (userResponse.errored) throw new Error(userResponse.message);
  
      patchState(this.state, {
        token: authResponse.payload,
        user: userResponse.payload,
        isLoading: false,
        isAuthenticated: true,
      });
    }
    catch (e) {
      patchState(this.state, initialState());
      console.log(e);
    }
  }

  logout(): void {
    patchState(this.state, initialState());
    this.storage.remove('token');
  }
}
