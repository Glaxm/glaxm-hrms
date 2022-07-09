import { TestBed } from '@angular/core/testing';

import { JobFunctionService } from './job-function.service';

describe('JobFunctionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobFunctionService = TestBed.get(JobFunctionService);
    expect(service).toBeTruthy();
  });
});
