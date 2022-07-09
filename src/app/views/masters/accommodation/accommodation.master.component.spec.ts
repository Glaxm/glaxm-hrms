import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccommodationMasterComponent } from './accommodation.master.component';

describe('AccommodationComponent', () => {
  let component: AccommodationMasterComponent;
  let fixture: ComponentFixture<AccommodationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccommodationMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
