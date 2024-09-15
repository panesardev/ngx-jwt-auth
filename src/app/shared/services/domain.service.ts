import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "../../app.constants";
import { HttpResponse } from "../interfaces/http.interface";

export class DomainService<T> {
  protected http = inject(HttpClient);
  protected domain = '';
  
  findAll(): Observable<HttpResponse<T[]>> {
    return this.http.get<HttpResponse<T[]>>(`${API_URL}/${this.domain}`);
  }

  findById(id: number): Observable<HttpResponse<T>> {
    if (!id) throw Error('domain id required');
    return this.http.get<HttpResponse<T>>(`${API_URL}/${this.domain}/${id}`);
  }

  create(payload: T): Observable<HttpResponse<T>> {
    if (!payload) throw Error('domain payload required');
    return this.http.post<HttpResponse<T>>(`${API_URL}/${this.domain}`, payload);
  }
  
  update(payload: T): Observable<HttpResponse<T>> {
    const id = payload['id'];
    if (!id) throw Error('domain payload id required');
    if (!payload) throw Error('domain payload required');
    return this.http.patch<HttpResponse<T>>(`${API_URL}/${this.domain}/${id}`, payload);
  }

  remove(id: number): Observable<HttpResponse<boolean>> {
    if (!id) throw Error('domain id required');
    return this.http.delete<HttpResponse<boolean>>(`${API_URL}/${this.domain}/${id}`);
  }

}