import { TestBed } from '@angular/core/testing';

import { RequestappService } from './requestapp.service';

describe('RequestappService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestappService = TestBed.get(RequestappService);
    expect(service).toBeTruthy();
  });
});
