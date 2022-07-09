import { TestBed } from '@angular/core/testing';

import { AssettranService } from './assettran.service';

describe('AssettranService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssettranService = TestBed.get(AssettranService);
    expect(service).toBeTruthy();
  });
});
