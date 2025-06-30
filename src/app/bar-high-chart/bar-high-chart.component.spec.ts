import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarHighChartComponent } from './bar-high-chart.component';

describe('BarHighChartComponent', () => {
  let component: BarHighChartComponent;
  let fixture: ComponentFixture<BarHighChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarHighChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarHighChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
