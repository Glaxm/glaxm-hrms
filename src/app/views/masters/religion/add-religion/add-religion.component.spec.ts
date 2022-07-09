import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReligionComponent } from './add-religion.component';

describe('AddReligionComponent', () => {
  let component: AddReligionComponent;
  let fixture: ComponentFixture<AddReligionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReligionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReligionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
