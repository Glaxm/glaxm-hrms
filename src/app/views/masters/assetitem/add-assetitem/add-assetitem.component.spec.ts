import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetitemComponent } from './add-assetitem.component';

describe('AddAssetitemComponent', () => {
  let component: AddAssetitemComponent;
  let fixture: ComponentFixture<AddAssetitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssetitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssetitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
