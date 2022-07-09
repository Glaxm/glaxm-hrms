import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHoldingComponent } from './add-holding.component';

describe('AddHoldingComponent', () => {
  let component: AddHoldingComponent;
  let fixture: ComponentFixture<AddHoldingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHoldingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHoldingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
