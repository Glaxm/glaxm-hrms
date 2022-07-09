import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAirSectorComponent } from './add-air-sector.component';

describe('AddAirSectorComponent', () => {
  let component: AddAirSectorComponent;
  let fixture: ComponentFixture<AddAirSectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAirSectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAirSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
