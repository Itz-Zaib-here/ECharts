import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrationFlowChartComponent } from './migration-flow-chart.component';

describe('MigrationFlowChartComponent', () => {
  let component: MigrationFlowChartComponent;
  let fixture: ComponentFixture<MigrationFlowChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MigrationFlowChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MigrationFlowChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
