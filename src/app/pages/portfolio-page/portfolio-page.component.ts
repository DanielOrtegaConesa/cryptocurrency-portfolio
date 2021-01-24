import { Component, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/model/Portfolio';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.sass']
})
export class PortfolioPageComponent implements OnInit {

  public portfolio = new Portfolio();
  constructor() { }

  ngOnInit(): void {
  }

  managePortfolioChange(portfolio: Portfolio): void {
    this.portfolio = portfolio;
  }
}
