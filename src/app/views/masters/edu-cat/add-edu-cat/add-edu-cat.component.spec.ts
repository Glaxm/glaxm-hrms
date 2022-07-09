import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEduCatComponent } from './add-edu-cat.component';

describe('AddEduCatComponent', () => {
  let component: AddEduCatComponent;
  let fixture: ComponentFixture<AddEduCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEduCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEduCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
