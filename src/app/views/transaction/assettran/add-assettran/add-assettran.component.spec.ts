import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssettranComponent } from './add-assettran.component';

describe('AddAssettranComponent', () => {
  let component: AddAssettranComponent;
  let fixture: ComponentFixture<AddAssettranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssettranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssettranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
