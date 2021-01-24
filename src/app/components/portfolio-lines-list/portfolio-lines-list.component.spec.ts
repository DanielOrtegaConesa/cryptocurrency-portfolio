import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioLinesListComponent } from './portfolio-lines-list.component';

describe('PortfolioLinesListComponent', () => {
  let component: PortfolioLinesListComponent;
  let fixture: ComponentFixture<PortfolioLinesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioLinesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioLinesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
