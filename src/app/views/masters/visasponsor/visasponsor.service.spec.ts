import { TestBed } from '@angular/core/testing';

import { VisasponsorService } from './visasponsor.service';

describe('VisasponsorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VisasponsorService = TestBed.get(VisasponsorService);
    expect(service).toBeTruthy();
  });
});
