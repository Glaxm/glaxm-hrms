import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicletranComponent } from './vehicletran.component';

describe('VehicletranComponent', () => {
  let component: VehicletranComponent;
  let fixture: ComponentFixture<VehicletranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicletranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicletranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
