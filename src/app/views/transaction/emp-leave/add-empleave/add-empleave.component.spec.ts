import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpleaveComponent } from './add-empleave.component';

describe('AddEmpleaveComponent', () => {
  let component: AddEmpleaveComponent;
  let fixture: ComponentFixture<AddEmpleaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmpleaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
