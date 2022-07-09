import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetgroupComponent } from './assetgroup.component';

describe('AssetgroupComponent', () => {
  let component: AssetgroupComponent;
  let fixture: ComponentFixture<AssetgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
