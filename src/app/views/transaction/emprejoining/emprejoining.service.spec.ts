import { TestBed } from '@angular/core/testing';

import { EmprejoiningService } from './emprejoining.service';

describe('EmprejoiningService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmprejoiningService = TestBed.get(EmprejoiningService);
    expect(service).toBeTruthy();
  });
});
