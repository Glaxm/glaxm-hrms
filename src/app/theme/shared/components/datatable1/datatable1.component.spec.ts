import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Datatable1Component } from './datatable1.component';

describe('Datatable1Component', () => {
  let component: Datatable1Component;
  let fixture: ComponentFixture<Datatable1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Datatable1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Datatable1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
