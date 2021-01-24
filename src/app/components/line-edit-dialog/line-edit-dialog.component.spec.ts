import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineEditDialogComponent } from './line-edit-dialog.component';

describe('LineEditDialogComponent', () => {
  let component: LineEditDialogComponent;
  let fixture: ComponentFixture<LineEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
