import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EduCatComponent } from './edu-cat.component';

describe('EduCatComponent', () => {
  let component: EduCatComponent;
  let fixture: ComponentFixture<EduCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EduCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EduCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
