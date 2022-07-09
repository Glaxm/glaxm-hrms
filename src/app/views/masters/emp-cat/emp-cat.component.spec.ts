import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpCatComponent } from './emp-cat.component';

describe('EmpCatComponent', () => {
  let component: EmpCatComponent;
  let fixture: ComponentFixture<EmpCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
