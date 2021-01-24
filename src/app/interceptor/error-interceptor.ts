import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private _snackBar: MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {

        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 200:
              break;
            case 204:
              break;
            default:
              let message = '';
              try {
                message = err.error.errors[0];
              } catch (e) {
                message = 'An unexpected error has occurred';
              }
              this._snackBar.open(message, '', {
                duration: 4000,
              });
              break;
          }
        }
        return throwError(err);
      })
    );
  }

}
