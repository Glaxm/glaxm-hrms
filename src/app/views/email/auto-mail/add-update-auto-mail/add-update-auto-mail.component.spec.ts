import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateAutoMailComponent } from './add-update-auto-mail.component';

describe('AddUpdateAutoMailComponent', () => {
  let component: AddUpdateAutoMailComponent;
  let fixture: ComponentFixture<AddUpdateAutoMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateAutoMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateAutoMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
