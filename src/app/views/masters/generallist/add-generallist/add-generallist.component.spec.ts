import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGenerallistComponent } from './add-generallist.component';

describe('AddGenerallistComponent', () => {
  let component: AddGenerallistComponent;
  let fixture: ComponentFixture<AddGenerallistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGenerallistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGenerallistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
