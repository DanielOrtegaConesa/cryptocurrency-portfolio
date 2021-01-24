import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Currency } from 'src/app/model/Currency';
import { ApiService } from 'src/app/services/api.service';
import { CacheService } from 'src/app/services/cache.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-currency-edit-dialog',
  templateUrl: './currency-edit-dialog.component.html',
  styleUrls: ['./currency-edit-dialog.component.sass']
})
export class CurrencyEditDialogComponent implements OnInit {

  public currency = new Currency();
  constructor(
    private dialogRef: MatDialogRef<CurrencyEditDialogComponent>,
    private _api: ApiService,
    private _cache: CacheService,
    private _snackBar: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  save(): void {
    this.currency.acronym = this.currency.acronym.toUpperCase();
    if (this._cache.existAcronym(this.currency.acronym)) {
      if (this.currency.id) {
        // The original idea was to use the commented code, but the server responds error with the put request
        /*
              this._api.currency.updateCurrency(this.currency).subscribe(() => {
                this.dialogRef.close(true);
              });
        */
        this._api.currency.save(this.currency).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this._api.currency.save(this.currency).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    } else {
      this._snackBar.show('Invalid acronym');
    }
  }
}
