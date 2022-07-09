import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehicletranComponent } from './add-vehicletran.component';

describe('AddVehicletranComponent', () => {
  let component: AddVehicletranComponent;
  let fixture: ComponentFixture<AddVehicletranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVehicletranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVehicletranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
