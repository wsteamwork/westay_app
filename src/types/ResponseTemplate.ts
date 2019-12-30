import { AxiosResponse, AxiosRequestConfig } from 'axios';
// import { isArray } from 'utils';

export interface BaseResponse<T = any> {
  code: number;
  status: string;
  data: T;
  message?: string;
  meta?: Pagination;
}

export interface TransformerInclude<T> {
  data: T;
}

// export type IsArray<E, T> = E extends any[] ? T[] : T;

export interface TypeSelect {
  id: number;
  value: string;
}

export interface ErrorValidate<E = any, T = Array<any>> {
  errors: PartialType<E, T>;
  error: string;
  exception: string;
}

export interface AxiosErrorCustom<T = any> extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosRes<T>;
  isAxiosError?: boolean;
}

/**
 * Pagination from response
 */
export interface Pagination {
  pagination: {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links:
      | {
          next: string;
          previous: string;
        }
      | any;
  };
}

export interface AxiosRes<T> extends AxiosResponse<BaseResponse<T>> {}

export interface AxiosValidateError<T, E = any> extends AxiosRes<ErrorValidate<T, E>> {}

type PartialType<E, T = any> = {
  [P in keyof E]: T;
};

export type AddExtraType<Interface, Type> = {
  [I in keyof Interface]: Interface[I] | Type;
};
