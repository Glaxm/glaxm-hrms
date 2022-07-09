import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpGradeComponent } from './emp-grade.component';

describe('EmpGradeComponent', () => {
  let component: EmpGradeComponent;
  let fixture: ComponentFixture<EmpGradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpGradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
