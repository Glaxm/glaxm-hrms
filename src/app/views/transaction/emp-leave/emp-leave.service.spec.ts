import { TestBed } from '@angular/core/testing';

import { EmpLeaveService } from './emp-leave.service';

describe('EmpLeaveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpLeaveService = TestBed.get(EmpLeaveService);
    expect(service).toBeTruthy();
  });
});
