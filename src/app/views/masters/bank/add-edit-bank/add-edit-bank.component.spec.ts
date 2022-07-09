import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBankComponent } from './add-edit-bank.component';

describe('AddEditBankComponent', () => {
  let component: AddEditBankComponent;
  let fixture: ComponentFixture<AddEditBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
