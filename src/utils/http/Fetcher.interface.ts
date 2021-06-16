import { Response } from 'got';

export interface FetcherInterface {
  get<T extends any>(url: string, searchParams?: { [key: string]: number | string }):Promise<Response<string>>
  post<T extends any>(url: string, body: { [key: string]: number | string }|unknown):Promise<Response<string>>
  delete<T extends any>(url: string, searchParams?: { [key: string]: number | string }):Promise<Response<string>>
  patch<T extends any>(url: string, body: { [key: string]: number | string }):Promise<Response<string>>
}
