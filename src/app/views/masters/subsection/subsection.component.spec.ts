import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsectionComponent } from './subsection.component';

describe('SubsectionComponent', () => {
  let component: SubsectionComponent;
  let fixture: ComponentFixture<SubsectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
