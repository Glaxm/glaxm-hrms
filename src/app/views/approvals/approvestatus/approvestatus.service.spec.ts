import { TestBed } from '@angular/core/testing';

import { ApprovestatusService } from './approvestatus.service';

describe('ApprovestatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApprovestatusService = TestBed.get(ApprovestatusService);
    expect(service).toBeTruthy();
  });
});
