import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDocsComponent } from './personal-docs.component';

describe('PersonalDocsComponent', () => {
  let component: PersonalDocsComponent;
  let fixture: ComponentFixture<PersonalDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
