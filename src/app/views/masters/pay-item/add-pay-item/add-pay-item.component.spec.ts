import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayItemComponent } from './add-pay-item.component';

describe('AddPayItemComponent', () => {
  let component: AddPayItemComponent;
  let fixture: ComponentFixture<AddPayItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPayItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
