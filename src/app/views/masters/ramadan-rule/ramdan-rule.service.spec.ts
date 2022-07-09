import { TestBed } from '@angular/core/testing';

import { RamdanRuleService } from './ramdan-rule.service';

describe('RamdanRuleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RamdanRuleService = TestBed.get(RamdanRuleService);
    expect(service).toBeTruthy();
  });
});
