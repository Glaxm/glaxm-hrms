import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpGradeComponent } from './add-emp-grade.component';

describe('AddEmpGradeComponent', () => {
  let component: AddEmpGradeComponent;
  let fixture: ComponentFixture<AddEmpGradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmpGradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
