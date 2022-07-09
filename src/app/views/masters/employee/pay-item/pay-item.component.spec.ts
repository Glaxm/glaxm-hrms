import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayItemComponent } from './pay-item.component';

describe('PayItemComponent', () => {
  let component: PayItemComponent;
  let fixture: ComponentFixture<PayItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
