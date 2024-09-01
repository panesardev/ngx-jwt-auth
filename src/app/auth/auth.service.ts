import { HttpClient } from "@angular/common/http";
import { effect, inject, Injectable, signal } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { API_URL } from "../app.constants";
import { Response } from "../shared/interfaces/response.interface";
import { StorageService } from "../shared/services/storage.service";
import { AuthState, CreateAccountRequestBody, LoginRequestBody, Token } from "./auth.interface";
import { decode, initialState } from "./auth.utilities";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storage = inject(StorageService);
  private http = inject(HttpClient);

  state = signal<AuthState>(initialState());

  onStateChange = effect(() => console.log('AuthState', this.state()));
  
  async login(body: LoginRequestBody): Promise<void> {
    const response = await firstValueFrom(
      this.http.post<Response<Token>>(`${API_URL}/auth/login`, body),
    );
    
    if (response.errored) throw Error(response.message);

    this.state.set({ 
      token: response.payload,
      userId: decode(response.payload).userId, 
      isAuthenticated: true,
    });
    
    this.storage.set('token', response.payload);
  }

  async createAccount(body: CreateAccountRequestBody): Promise<void> {
    const response = await firstValueFrom(
      this.http.post<Response<Token>>(`${API_URL}/auth/create-account`, body),
    );

    if (response.errored) throw Error(response.message);

    this.state.set({ 
      token: response.payload,
      userId: decode(response.payload).userId, 
      isAuthenticated: true,
    });

    this.storage.set('token', response.payload);
  }

  logout(): void {
    this.state.set(initialState());
    this.storage.remove('token');
  }
}
