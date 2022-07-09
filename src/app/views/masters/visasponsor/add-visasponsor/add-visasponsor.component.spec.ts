import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVisasponsorComponent } from './add-visasponsor.component';

describe('AddVisasponsorComponent', () => {
  let component: AddVisasponsorComponent;
  let fixture: ComponentFixture<AddVisasponsorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVisasponsorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVisasponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
