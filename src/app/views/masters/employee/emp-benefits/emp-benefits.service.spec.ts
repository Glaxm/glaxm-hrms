import { TestBed } from '@angular/core/testing';

import { EmpBenefitsService } from './emp-benefits.service';

describe('EmpBenefitsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpBenefitsService = TestBed.get(EmpBenefitsService);
    expect(service).toBeTruthy();
  });
});
