import { TestBed } from '@angular/core/testing';

import { OpeningLeaveBalService } from './opening-leave-bal.service';

describe('OpeningLeaveBalaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpeningLeaveBalService = TestBed.get(OpeningLeaveBalService);
    expect(service).toBeTruthy();
  });
});
