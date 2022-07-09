import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssettranComponent } from './assettran.component';

describe('AssettranComponent', () => {
  let component: AssettranComponent;
  let fixture: ComponentFixture<AssettranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssettranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssettranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
