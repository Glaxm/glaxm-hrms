import { TestBed } from '@angular/core/testing';

import { GenerallistService } from './generallist.service';

describe('GenerallistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerallistService = TestBed.get(GenerallistService);
    expect(service).toBeTruthy();
  });
});
