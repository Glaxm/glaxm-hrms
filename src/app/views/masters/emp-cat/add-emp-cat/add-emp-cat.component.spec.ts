import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpCatComponent } from './add-emp-cat.component';

describe('AddEmpCatComponent', () => {
  let component: AddEmpCatComponent;
  let fixture: ComponentFixture<AddEmpCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmpCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
