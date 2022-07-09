import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Column1Component } from './column1.component';

describe('Column1Component', () => {
  let component: Column1Component;
  let fixture: ComponentFixture<Column1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Column1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Column1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
