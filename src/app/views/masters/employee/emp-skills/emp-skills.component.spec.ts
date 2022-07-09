import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpSkillsComponent } from './emp-skills.component';

describe('EmpSkillsComponent', () => {
  let component: EmpSkillsComponent;
  let fixture: ComponentFixture<EmpSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
