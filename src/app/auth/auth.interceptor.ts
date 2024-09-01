import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { StorageService } from "../shared/services/storage.service";

export const AuthInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn) => {
  const storage = inject(StorageService);
  
  const token = storage.get('token');

  if (token) {
    request = request.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(request);
}
