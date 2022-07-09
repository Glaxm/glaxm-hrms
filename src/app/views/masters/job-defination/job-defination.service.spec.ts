import { TestBed } from '@angular/core/testing';

import { JobDefinationService } from './job-defination.service';

describe('JobDefinationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobDefinationService = TestBed.get(JobDefinationService);
    expect(service).toBeTruthy();
  });
});
