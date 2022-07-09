import { TestBed } from '@angular/core/testing';

import { PayrollSettingService } from './payroll-setting.service';

describe('PayrollSettingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayrollSettingService = TestBed.get(PayrollSettingService);
    expect(service).toBeTruthy();
  });
});
