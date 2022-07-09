import { TestBed } from '@angular/core/testing';

import { DocumenttypeService } from './documenttype.service';

describe('DocumenttypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumenttypeService = TestBed.get(DocumenttypeService);
    expect(service).toBeTruthy();
  });
});
