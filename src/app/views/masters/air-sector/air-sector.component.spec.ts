import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirSectorComponent } from './air-sector.component';

describe('AirSectorComponent', () => {
  let component: AirSectorComponent;
  let fixture: ComponentFixture<AirSectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirSectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
