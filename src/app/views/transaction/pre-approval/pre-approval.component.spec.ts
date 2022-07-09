import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreApprovalComponent } from './pre-approval.component';

describe('PreApprovalComponent', () => {
  let component: PreApprovalComponent;
  let fixture: ComponentFixture<PreApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
