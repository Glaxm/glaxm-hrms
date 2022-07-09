import { TestBed } from '@angular/core/testing';

import { PreApprovalService } from './pre-approval.service';

describe('PreApprovalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreApprovalService = TestBed.get(PreApprovalService);
    expect(service).toBeTruthy();
  });
});
