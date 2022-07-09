import { TestBed } from '@angular/core/testing';

import { EmpCatService } from './emp-cat.service';

describe('EmpCatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpCatService = TestBed.get(EmpCatService);
    expect(service).toBeTruthy();
  });
});
