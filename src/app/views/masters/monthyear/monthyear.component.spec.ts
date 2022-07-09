import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthyearComponent } from './monthyear.component';

describe('MonthyearComponent', () => {
  let component: MonthyearComponent;
  let fixture: ComponentFixture<MonthyearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthyearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
