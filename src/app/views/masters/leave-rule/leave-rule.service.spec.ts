import { TestBed } from '@angular/core/testing';

import { LeaveRuleService } from './leave-rule.service';

describe('LeaveRuleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeaveRuleService = TestBed.get(LeaveRuleService);
    expect(service).toBeTruthy();
  });
});
