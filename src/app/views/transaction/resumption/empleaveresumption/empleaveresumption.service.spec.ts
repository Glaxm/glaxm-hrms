import { TestBed } from '@angular/core/testing';

import { EmpleaveresumptionService } from './empleaveresumption.service';

describe('EmpleaveresumptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpleaveresumptionService = TestBed.get(EmpleaveresumptionService);
    expect(service).toBeTruthy();
  });
});
