import got from 'got';
import { injectable } from 'inversify';
import {FetcherInterface} from "@utils/http/Fetcher.interface";

@injectable()
export class FetcherSingleton implements FetcherInterface {
  constructor() {
    Object.freeze(this);
  }

  get<T extends any>(url: string, searchParams?: { [key: string]: number | string }) {
    // @ts-ignore
    return got.get<T>(url, { responseType: 'json', searchParams });
  }


  post<T extends any>(url: string, body: { [key: string]: number | string }|unknown) {
    // @ts-ignore
    return got.post<T>(url, { responseType: 'json', json: true, body });
  }


  delete<T extends any>(url: string, searchParams?: { [key: string]: number | string }) {
    // @ts-ignore
    return got.delete<T>(url, { responseType: 'json', searchParams });
  }

  patch<T extends any>(url: string, body: { [key: string]: number | string }) {
    // @ts-ignore
    return got.patch<T>(url, { responseType: 'json', json: true, body });
  }
}
