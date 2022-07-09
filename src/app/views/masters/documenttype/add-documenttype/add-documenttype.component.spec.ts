import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocumenttypeComponent } from './add-documenttype.component';

describe('AddDocumenttypeComponent', () => {
  let component: AddDocumenttypeComponent;
  let fixture: ComponentFixture<AddDocumenttypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDocumenttypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocumenttypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
