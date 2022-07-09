import { TestBed } from '@angular/core/testing';

import { MonthyearService } from './monthyear.service';

describe('MonthyearService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MonthyearService = TestBed.get(MonthyearService);
    expect(service).toBeTruthy();
  });
});
