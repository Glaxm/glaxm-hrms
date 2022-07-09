import { TestBed } from '@angular/core/testing';

import { EmployeeloanService } from './employeeloan.service';

describe('EmployeeloanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeloanService = TestBed.get(EmployeeloanService);
    expect(service).toBeTruthy();
  });
});
