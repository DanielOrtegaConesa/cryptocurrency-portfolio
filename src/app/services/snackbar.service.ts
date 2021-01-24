import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }


  show(msg: string): void {
    this._snackBar.open(msg, '', {
      duration: 4000,
    });
  }
}
