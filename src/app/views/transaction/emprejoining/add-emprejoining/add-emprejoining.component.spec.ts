import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmprejoiningComponent } from './add-emprejoining.component';

describe('AddEmprejoiningComponent', () => {
  let component: AddEmprejoiningComponent;
  let fixture: ComponentFixture<AddEmprejoiningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmprejoiningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmprejoiningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
