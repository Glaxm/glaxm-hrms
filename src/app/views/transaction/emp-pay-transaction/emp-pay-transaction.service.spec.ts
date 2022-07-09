import { TestBed } from '@angular/core/testing';

import { EmpPayTransactionService } from './emp-pay-transaction.service';

describe('EmpPayTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpPayTransactionService = TestBed.get(EmpPayTransactionService);
    expect(service).toBeTruthy();
  });
});
