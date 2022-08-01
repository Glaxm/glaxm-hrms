import { TestBed } from '@angular/core/testing';

import { AutoMailService } from './auto-mail.service';

describe('AutoMailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoMailService = TestBed.get(AutoMailService);
    expect(service).toBeTruthy();
  });
});
