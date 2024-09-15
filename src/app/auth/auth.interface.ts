import { JWTPayload } from 'jose';
import { User } from '../domains/users/user.interface';

export interface AuthState {
  token: string;
  isAuthenticated: boolean;
  user: User;
  isLoading: boolean;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface CreateAccountRequestBody {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type Token = string;

export interface ExtendedJwtPayload extends JWTPayload {
  userId: User['id'];
}
