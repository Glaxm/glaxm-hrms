import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningLeaveBalaComponent } from './opening-leave-bala.component';

describe('OpeningLeaveBalaComponent', () => {
  let component: OpeningLeaveBalaComponent;
  let fixture: ComponentFixture<OpeningLeaveBalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningLeaveBalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningLeaveBalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
