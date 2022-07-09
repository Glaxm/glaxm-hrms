import { TestBed } from '@angular/core/testing';

import { LeaveItemService } from './leave-item.service';

describe('LeaveItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeaveItemService = TestBed.get(LeaveItemService);
    expect(service).toBeTruthy();
  });
});
