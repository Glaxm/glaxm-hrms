import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpIncreamentComponent } from './emp-increament.component';

describe('EmpIncreamentComponent', () => {
  let component: EmpIncreamentComponent;
  let fixture: ComponentFixture<EmpIncreamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpIncreamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpIncreamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
