import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetExpiryReportComponent } from './asset-expiry-report.component';

describe('AssetExpiryReportComponent', () => {
  let component: AssetExpiryReportComponent;
  let fixture: ComponentFixture<AssetExpiryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetExpiryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetExpiryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
