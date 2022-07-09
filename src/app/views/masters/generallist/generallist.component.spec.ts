import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerallistComponent } from './generallist.component';

describe('GenerallistComponent', () => {
  let component: GenerallistComponent;
  let fixture: ComponentFixture<GenerallistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerallistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerallistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
