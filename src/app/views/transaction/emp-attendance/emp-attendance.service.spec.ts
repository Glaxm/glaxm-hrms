import { TestBed } from '@angular/core/testing';

import { EmpAttendanceService } from './emp-attendance.service';

describe('EmpAttendanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpAttendanceService = TestBed.get(EmpAttendanceService);
    expect(service).toBeTruthy();
  });
});
