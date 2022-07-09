import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransferFormComponent } from './add-transfer-form.component';

describe('AddTransferFormComponent', () => {
  let component: AddTransferFormComponent;
  let fixture: ComponentFixture<AddTransferFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTransferFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
