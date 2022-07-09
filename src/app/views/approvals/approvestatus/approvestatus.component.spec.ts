import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovestatusComponent } from './approvestatus.component';

describe('ApprovestatusComponent', () => {
  let component: ApprovestatusComponent;
  let fixture: ComponentFixture<ApprovestatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovestatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
