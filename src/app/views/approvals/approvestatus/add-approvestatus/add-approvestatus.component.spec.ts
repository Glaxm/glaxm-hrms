import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApprovestatusComponent } from './add-approvestatus.component';

describe('AddApprovestatusComponent', () => {
  let component: AddApprovestatusComponent;
  let fixture: ComponentFixture<AddApprovestatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddApprovestatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddApprovestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
