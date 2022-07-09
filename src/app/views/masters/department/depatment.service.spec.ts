import { TestBed } from '@angular/core/testing';

import { DepatmentService } from './depatment.service';

describe('DepatmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepatmentService = TestBed.get(DepatmentService);
    expect(service).toBeTruthy();
  });
});
