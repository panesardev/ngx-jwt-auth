export interface HttpResponse<T> {
  message?: string;
  errored?: boolean;
  payload?: T;
}
