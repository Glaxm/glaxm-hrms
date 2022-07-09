import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeloanComponent } from './add-employeeloan.component';

describe('AddEmployeeloanComponent', () => {
  let component: AddEmployeeloanComponent;
  let fixture: ComponentFixture<AddEmployeeloanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmployeeloanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
