import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, of, switchMap, throwError } from "rxjs";
import { API_URL } from "../../app.constants";
import { Response } from "../interfaces/response.interface";

export class DomainService<T> {
  protected http = inject(HttpClient);
  protected domain = '';
  
  findAll(): Observable<T[]> {
    return this.http.get<Response<T[]>>(`${API_URL}/${this.domain}`).pipe(
      switchMap(response => {
        if (response.errored) {
          return throwError(() => new Error(response.message));
        }
        return of(response.payload);
      }),
    );
  }

  findById(id: number): Observable<T> {
    if (!id) throw Error('domain id required');
    return this.http.get<Response<T>>(`${API_URL}/${this.domain}/${id}`).pipe(
      switchMap(response => {
        if (response.errored) {
          return throwError(() => new Error(response.message));
        }
        return of(response.payload);
      }),
    );
  }

  create(payload: T): Observable<T> {
    if (!payload) throw Error('domain payload required');
    return this.http.post<Response<T>>(`${API_URL}/${this.domain}`, payload).pipe(
      switchMap(response => {
        if (response.errored) {
          return throwError(() => new Error(response.message));
        }
        return of(response.payload);
      }),
    );
  }
  
  update(payload: T): Observable<T> {
    const id = payload['id'];
    if (!id) throw Error('domain id required');
    if (!payload) throw Error('domain payload required');
    return this.http.patch<Response<T>>(`${API_URL}/${this.domain}/${id}`, payload).pipe(
      switchMap(response => {
        if (response.errored) {
          return throwError(() => new Error(response.message));
        }
        return of(response.payload);
      }),
    );
  }

  remove(id: number): Observable<boolean> {
    if (!id) throw Error('domain id required');
    return this.http.delete<Response<boolean>>(`${API_URL}/${this.domain}/${id}`).pipe(
      switchMap(response => {
        if (response.errored) {
          return throwError(() => new Error(response.message));
        }
        return of(response.payload);
      }),
    );
  }

}