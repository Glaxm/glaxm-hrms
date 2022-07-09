import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequestappComponent } from './add-requestapp.component';

describe('AddRequestappComponent', () => {
  let component: AddRequestappComponent;
  let fixture: ComponentFixture<AddRequestappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRequestappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRequestappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
