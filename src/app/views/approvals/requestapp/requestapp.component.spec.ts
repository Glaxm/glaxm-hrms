import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestappComponent } from './requestapp.component';

describe('RequestappComponent', () => {
  let component: RequestappComponent;
  let fixture: ComponentFixture<RequestappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
