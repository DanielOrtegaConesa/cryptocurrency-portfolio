import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private acronyms = {};
  constructor(
    private _http: HttpClient
  ) { }

  loadAll(): void {
    this.loadAcronyms();
  }

  loadAcronyms(): void {
    this._http.get<any>('https://min-api.cryptocompare.com/data/all/coinlist')
      .subscribe((res) => {
        res = res.Data;
        Object.keys(res).forEach(key => {
          this.acronyms[key.toLowerCase()] = true;
        });
      });
  }

  existAcronym(acr: string): boolean {
    return this.acronyms[acr.toLowerCase()];
  }


}
