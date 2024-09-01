import { isDevMode } from "@angular/core";

export const BRAND = 'ngx-jwt-auth';

export const API_URL = isDevMode() ? 'http://localhost:3000/api' : 'production-api-url/api';

export const JWT_EXPIRY = '7d';
