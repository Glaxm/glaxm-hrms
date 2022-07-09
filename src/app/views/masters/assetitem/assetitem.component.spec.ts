import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetitemComponent } from './assetitem.component';

describe('AssetitemComponent', () => {
  let component: AssetitemComponent;
  let fixture: ComponentFixture<AssetitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
