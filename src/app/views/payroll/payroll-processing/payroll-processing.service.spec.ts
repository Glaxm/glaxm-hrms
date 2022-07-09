import { TestBed } from '@angular/core/testing';

import { PayrollProcessingService } from './payroll-processing.service';

describe('PayrollProcessingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayrollProcessingService = TestBed.get(PayrollProcessingService);
    expect(service).toBeTruthy();
  });
});
