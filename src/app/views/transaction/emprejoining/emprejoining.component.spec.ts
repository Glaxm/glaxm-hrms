import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprejoiningComponent } from './emprejoining.component';

describe('EmprejoiningComponent', () => {
  let component: EmprejoiningComponent;
  let fixture: ComponentFixture<EmprejoiningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmprejoiningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmprejoiningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
