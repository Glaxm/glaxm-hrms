import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMonthyearComponent } from './add-monthyear.component';

describe('AddMonthyearComponent', () => {
  let component: AddMonthyearComponent;
  let fixture: ComponentFixture<AddMonthyearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMonthyearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMonthyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
