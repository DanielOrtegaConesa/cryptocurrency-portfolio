import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Portfolio } from 'src/app/model/Portfolio';
import { ApiService } from 'src/app/services/api.service';
import { PortfolioEditDialogComponent } from '../portfolio-edit-dialog/portfolio-edit-dialog.component';

@Component({
  selector: 'app-portfolio-show',
  templateUrl: './portfolio-show.component.html',
  styleUrls: ['./portfolio-show.component.sass']
})
export class PortfolioShowComponent implements OnInit {

  public active = 0;
  public portfolios = [];
  @Output() portfolioChange = new EventEmitter<Portfolio>();
  constructor(
    private _api: ApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadPortfolios();
  }

  delete(event, portfolio: Portfolio, index: number): void {
    event.stopPropagation();
    this._api.portfolio.delete(portfolio).subscribe(() => {
      this.portfolios.splice(index, 1);
      if (this.active === index) {
        this.active = 0;
        this.portfolioChange.emit(this.portfolios[this.active]);
      }
    });
  }

  edit(event, portfolio = new Portfolio(), index = 0): void {
    const isnew = portfolio.id.length === 0;
    event.stopPropagation();
    const dialogRef = this.dialog.open(PortfolioEditDialogComponent, { minWidth: '350px', disableClose: true });
    dialogRef.componentInstance.portfolio = portfolio;
    dialogRef.componentInstance.originalPortfolio = JSON.parse(JSON.stringify(portfolio));
    dialogRef.afterClosed().subscribe((val) => {
      if (isnew) {
        if (portfolio.id) {
          this.portfolios.push(val);
          this.active = this.portfolios.length - 1;
          this.portfolioChange.emit(this.portfolios[this.active]);
        }
      } else {
        this.portfolios[index] = val;
      }
    });
  }

  loadPortfolios(): void {
    this._api.portfolio.getAll().subscribe((val) => {
      this.portfolios = val;
      this.changePortfolio(0, this.portfolios[0]);
    });
  }

  changePortfolio(ind: number, porfolio: Portfolio): void {
    this.active = ind;
    this.portfolioChange.emit(porfolio);
  }
}
