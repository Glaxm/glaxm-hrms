import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShiftRotationComponent } from './add-shift-rotation.component';

describe('AddShiftRotationComponent', () => {
  let component: AddShiftRotationComponent;
  let fixture: ComponentFixture<AddShiftRotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddShiftRotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShiftRotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
