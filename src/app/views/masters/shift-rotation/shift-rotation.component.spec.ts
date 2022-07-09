import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftRotationComponent } from './shift-rotation.component';

describe('ShiftRotationComponent', () => {
  let component: ShiftRotationComponent;
  let fixture: ComponentFixture<ShiftRotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftRotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftRotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
