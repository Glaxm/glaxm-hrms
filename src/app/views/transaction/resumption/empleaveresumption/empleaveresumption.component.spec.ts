import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleaveresumptionComponent } from './empleaveresumption.component';

describe('EmpleaveresumptionComponent', () => {
  let component: EmpleaveresumptionComponent;
  let fixture: ComponentFixture<EmpleaveresumptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleaveresumptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleaveresumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
