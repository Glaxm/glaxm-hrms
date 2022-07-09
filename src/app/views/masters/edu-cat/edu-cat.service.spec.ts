import { TestBed } from '@angular/core/testing';

import { EduCatService } from './edu-cat.service';

describe('EduCatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EduCatService = TestBed.get(EduCatService);
    expect(service).toBeTruthy();
  });
});
