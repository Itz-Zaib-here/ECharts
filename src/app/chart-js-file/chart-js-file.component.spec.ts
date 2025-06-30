import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartJsFileComponent } from './chart-js-file.component';

describe('ChartJsFileComponent', () => {
  let component: ChartJsFileComponent;
  let fixture: ComponentFixture<ChartJsFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartJsFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartJsFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
