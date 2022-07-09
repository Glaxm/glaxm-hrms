import { TestBed } from '@angular/core/testing';

import { TransferFormService } from './transfer-form.service';

describe('TransferFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransferFormService = TestBed.get(TransferFormService);
    expect(service).toBeTruthy();
  });
});
