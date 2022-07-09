import { TestBed } from '@angular/core/testing';

import { AirSectorService } from './air-sector.service';

describe('AirSectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AirSectorService = TestBed.get(AirSectorService);
    expect(service).toBeTruthy();
  });
});
