import { TestBed } from '@angular/core/testing';

import { ExitFormService } from './exit-form.service';

describe('ExitFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExitFormService = TestBed.get(ExitFormService);
    expect(service).toBeTruthy();
  });
});
