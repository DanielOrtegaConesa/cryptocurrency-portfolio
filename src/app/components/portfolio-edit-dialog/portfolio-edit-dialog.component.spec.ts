import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioEditDialogComponent } from './portfolio-edit-dialog.component';

describe('PortfolioEditDialogComponent', () => {
  let component: PortfolioEditDialogComponent;
  let fixture: ComponentFixture<PortfolioEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
