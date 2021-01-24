import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Currency } from '../model/Currency';
import { Portfolio } from '../model/Portfolio';
import { PortfolioLine } from '../model/PortfolioLine';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private cryptocompareCurrencies = [];

  private _baseurl = 'https://sheltered-cliffs-34052.herokuapp.com/api/';

  constructor(
    private _http: HttpClient
  ) { }

  public currency = {
    getAll: () => {
      return this._http.get<any>(this._baseurl + 'currency').pipe(
        map((val) => {
          val = val._embedded.currencies;
          return val;
        })
      );
    },

    save: (currency: Currency) => {
      return this._http.post<any>(this._baseurl + 'currency', currency).pipe(
        map((val) => {
          return val;
        })
      );
    },

    update: (currency: Currency) => {
      return this._http.put<any>(this._baseurl + 'currency', currency);
    },

    delete: (currency: Currency) => {
      return this._http.delete<any>(this._baseurl + 'currency/' + currency.id);
    }
  };

  public portfolio = {
    getAll: () => {
      return this._http.get<any>(this._baseurl + 'portfolio').pipe(
        map((val) => {
          val = val._embedded.portfolios;
          val.forEach(pflio => {

            // get lines
            this._http.get<any>(pflio._links.lines.href)
              .pipe(map((portfolioLines) => {
                portfolioLines = portfolioLines._embedded.portfolioLines;

                // get currency
                portfolioLines.forEach(line => {
                  this._http.get<any>(line._links.currency.href).subscribe((currency) => {
                    line.currency = currency;
                  });
                });

                return portfolioLines;
              })).subscribe((lines) => {
                pflio.lines = lines;
              });
          });
          return val;
        })
      );
    },

    save: (portfolio: Portfolio) => {
      const data = {
        id: portfolio.id,
        name: portfolio.name
      };
      return this._http.post<any>(this._baseurl + 'portfolio', data).pipe(
        map((val) => {
          return val;
        })
      );
    },

    update: (portfolio: Portfolio) => {
      return this._http.put<any>(this._baseurl + 'portfolio', portfolio);
    },

    delete: (portfolio: Portfolio) => {
      return this._http.delete<any>(this._baseurl + 'portfolio/' + portfolio.id);
    }
  };


  public portfolioLines = {
    getAll: () => {
      return this._http.get<any>(this._baseurl + 'lines').pipe(
        map((val) => {
          val = val._embedded.portfolios;
          return val;
        })
      );
    },

    save: (portfolioLine: PortfolioLine, portfolioId = null) => {
      return this._http.post<any>(this._baseurl + 'portfolioline', portfolioLine).pipe(
        map((val) => {
          return val;
        })
      );
    },

    update: (portfolioLine: PortfolioLine) => {
      const data = {};
      Object.assign(data, portfolioLine)
      data['currency'] = "https://sheltered-cliffs-34052.herokuapp.com/api/currency/" + portfolioLine.currency['id'];
      return this._http.put<any>(this._baseurl + 'portfolioline/' + portfolioLine.id, data);
    },

    delete: (portfolioLine: PortfolioLine) => {
      return this._http.delete<any>(this._baseurl + 'portfolioline/' + portfolioLine.id);
    }


  }
}
