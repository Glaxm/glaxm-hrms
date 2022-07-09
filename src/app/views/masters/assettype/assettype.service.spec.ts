import { TestBed } from '@angular/core/testing';

import { AssettypeService } from './assettype.service';

describe('AssettypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssettypeService = TestBed.get(AssettypeService);
    expect(service).toBeTruthy();
  });
});
