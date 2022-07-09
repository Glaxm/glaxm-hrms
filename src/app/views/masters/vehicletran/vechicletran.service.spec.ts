import { TestBed } from '@angular/core/testing';

import { VechicletranService } from './vechicletran.service';

describe('VechicletranService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VechicletranService = TestBed.get(VechicletranService);
    expect(service).toBeTruthy();
  });
});
