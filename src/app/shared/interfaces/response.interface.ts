export interface Response<T> {
  message?: string;
  errored?: boolean;
  payload?: T;
}
