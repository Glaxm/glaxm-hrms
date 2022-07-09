import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobcardComponent } from './add-jobcard.component';

describe('AddJobcardComponent', () => {
  let component: AddJobcardComponent;
  let fixture: ComponentFixture<AddJobcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJobcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
