import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetgroupComponent } from './add-assetgroup.component';

describe('AddAssetgroupComponent', () => {
  let component: AddAssetgroupComponent;
  let fixture: ComponentFixture<AddAssetgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssetgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssetgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
