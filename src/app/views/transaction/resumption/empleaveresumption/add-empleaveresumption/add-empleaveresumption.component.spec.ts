import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpleaveresumptionComponent } from './add-empleaveresumption.component';

describe('AddEmpleaveresumptionComponent', () => {
  let component: AddEmpleaveresumptionComponent;
  let fixture: ComponentFixture<AddEmpleaveresumptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmpleaveresumptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpleaveresumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
