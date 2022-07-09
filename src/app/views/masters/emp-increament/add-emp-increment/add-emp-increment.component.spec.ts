import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpIncrementComponent } from './add-emp-increment.component';

describe('AddEmpIncrementComponent', () => {
  let component: AddEmpIncrementComponent;
  let fixture: ComponentFixture<AddEmpIncrementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmpIncrementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpIncrementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
