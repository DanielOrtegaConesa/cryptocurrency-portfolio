import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Portfolio } from 'src/app/model/Portfolio';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-portfolio-edit-dialog',
  templateUrl: './portfolio-edit-dialog.component.html',
  styleUrls: ['./portfolio-edit-dialog.component.sass']
})
export class PortfolioEditDialogComponent implements OnInit {

  public portfolio: Portfolio;
  public originalPortfolio: Portfolio;

  constructor(
    private _api: ApiService,
    private dialogRef: MatDialogRef<PortfolioEditDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  save(): void {
    if (this.portfolio.id) {
      // The original idea was to use the commented code, but the server responds error with the put request
      /*this._api.portfolio.update(this.portfolio).subscribe(() => {
        this.dialogRef.close(this.portfolio);
      });*/
      this._api.portfolio.save(this.portfolio).subscribe((val) => {
        this.portfolio.id = val.id;
        this.dialogRef.close(this.portfolio);
      });
    } else {
      this._api.portfolio.save(this.portfolio).subscribe((val) => {
        this.portfolio.id = val.id;
        this.dialogRef.close(this.portfolio);
      });
    }
  }

  valid() {
    return this.portfolio.name.length >= 4 && this.portfolio.name.length <= 24;
  }

}
