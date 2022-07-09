import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssettypeComponent } from './add-assettype.component';

describe('AddAssettypeComponent', () => {
  let component: AddAssettypeComponent;
  let fixture: ComponentFixture<AddAssettypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssettypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssettypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
