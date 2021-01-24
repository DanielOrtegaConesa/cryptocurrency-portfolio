import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Currency } from 'src/app/model/Currency';
import { Portfolio } from 'src/app/model/Portfolio';
import { PortfolioLine } from 'src/app/model/PortfolioLine';
import { ApiService } from 'src/app/services/api.service';
import { CacheService } from 'src/app/services/cache.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-line-edit-dialog',
  templateUrl: './line-edit-dialog.component.html',
  styleUrls: ['./line-edit-dialog.component.sass']
})
export class LineEditDialogComponent implements OnInit {

  public line: PortfolioLine;
  public portfolio: Portfolio;
  public originalLine: PortfolioLine;
  public currencyOptions: Currency[] = [];
  constructor(
    private dialogRef: MatDialogRef<LineEditDialogComponent>,
    private _api: ApiService,
    private _cache: CacheService,
    private _snackBar: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  save(): void {
    if (this.line.id) {
      this._api.portfolioLines.update(this.line).subscribe((val) => {
        this.line.id = val.id;
        this.dialogRef.close(this.line);
      });
    } else {
      this._api.portfolioLines.save(this.line, this.portfolio.id).subscribe((val) => {
        this.line.id = val.id;
        this.dialogRef.close(this.line);
      });
    }

  }

  currencyChange(id): void {
    const currency = this.currencyOptions.find(el => el.id === id);
    this.line.currency = currency;
  }
}
