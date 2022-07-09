import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitlementFormComponent } from './entitlement-form.component';

describe('EntitlementFormComponent', () => {
  let component: EntitlementFormComponent;
  let fixture: ComponentFixture<EntitlementFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitlementFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitlementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
