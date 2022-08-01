import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoMailComponent } from './auto-mail.component';

describe('AutoMailComponent', () => {
  let component: AutoMailComponent;
  let fixture: ComponentFixture<AutoMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
