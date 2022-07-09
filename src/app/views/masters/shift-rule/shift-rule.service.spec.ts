import { TestBed } from '@angular/core/testing';

import { ShiftRuleService } from './shift-rule.service';

describe('ShiftRuleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShiftRuleService = TestBed.get(ShiftRuleService);
    expect(service).toBeTruthy();
  });
});
