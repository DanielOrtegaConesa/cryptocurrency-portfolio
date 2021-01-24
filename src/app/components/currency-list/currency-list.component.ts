import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Currency } from 'src/app/model/Currency';
import { ApiService } from 'src/app/services/api.service';
import { CurrencyEditDialogComponent } from '../currency-edit-dialog/currency-edit-dialog.component';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.sass']
})
export class CurrencyListComponent implements OnInit {

  public displayedColumns = ['name', 'acronym', 'actions'];
  public currencies = [];
  constructor(
    private _api: ApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCurrencies();
  }

  delete(currency: Currency): void {
    this._api.currency.delete(currency).subscribe(() => { this.loadCurrencies(); });
  }

  edit(currency = new Currency()): void {
    const dialogRef = this.dialog.open(CurrencyEditDialogComponent, { disableClose: true });
    dialogRef.componentInstance.currency = currency;
    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        this.loadCurrencies();
      }
    });
  }

  loadCurrencies(): void {
    this._api.currency.getAll().subscribe((val) => {
      this.currencies = val;
    });
  }
}
