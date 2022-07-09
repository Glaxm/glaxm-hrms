import { TestBed } from '@angular/core/testing';

import { ShiftRotationService } from './shift-rotation.service';

describe('ShiftRotationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShiftRotationService = TestBed.get(ShiftRotationService);
    expect(service).toBeTruthy();
  });
});
