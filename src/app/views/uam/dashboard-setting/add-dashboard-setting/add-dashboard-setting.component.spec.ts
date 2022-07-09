import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDashboardSettingComponent } from './add-dashboard-setting.component';

describe('AddDashboardSettingComponent', () => {
  let component: AddDashboardSettingComponent;
  let fixture: ComponentFixture<AddDashboardSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDashboardSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDashboardSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
