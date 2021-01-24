import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Portfolio } from 'src/app/model/Portfolio';
import { LineEditDialogComponent } from 'src/app/components/line-edit-dialog/line-edit-dialog.component';
import { PortfolioLine } from 'src/app/model/PortfolioLine';
import { ApiService } from 'src/app/services/api.service';
import { MatTable } from '@angular/material/table';
import { CacheService } from 'src/app/services/cache.service';
import { Currency } from 'src/app/model/Currency';

@Component({
  selector: 'app-portfolio-lines-list',
  templateUrl: './portfolio-lines-list.component.html',
  styleUrls: ['./portfolio-lines-list.component.sass']
})
export class PortfolioLinesListComponent implements OnInit {

  public displayedColumns = ['amount', 'currency', 'actions'];
  public currencyOptions = [];
  @Input() portfolio: Portfolio;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(
    private dialog: MatDialog,
    private _api: ApiService,
    private _cache: CacheService
  ) { }

  ngOnInit(): void {
    this.loadCurrencyOptions();
  }

  delete(portfolio: PortfolioLine, index: number): void {
    this._api.portfolioLines.delete(portfolio).subscribe();
    this.portfolio.lines.splice(index, 1);
    this.portfolio.lines = this.portfolio.lines;
    this.table.renderRows();
  }

  edit(line = new PortfolioLine()): void {
    const isnew = line.id.length === 0;
    const dialogRef = this.dialog.open(LineEditDialogComponent, { disableClose: true });
    dialogRef.componentInstance.line = line;
    dialogRef.componentInstance.originalLine = JSON.parse(JSON.stringify(line));
    dialogRef.componentInstance.currencyOptions = this.currencyOptions;
    dialogRef.componentInstance.portfolio = this.portfolio;
    dialogRef.afterClosed().subscribe((val) => {
      if (isnew) {
        this.portfolio.lines.push(val);
      } else {
        line = val;
      }
      this.table.renderRows();
    });
  }

  loadCurrencyOptions(): void {
    this._api.currency.getAll().subscribe((res) => {
      this.currencyOptions = res;
    });
  }

}
