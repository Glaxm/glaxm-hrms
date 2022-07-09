import { TestBed } from '@angular/core/testing';

import { AssignShiftService } from './assign-shift.service';

describe('AssignShiftService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssignShiftService = TestBed.get(AssignShiftService);
    expect(service).toBeTruthy();
  });
});
