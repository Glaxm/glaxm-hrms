import { TestBed } from '@angular/core/testing';

import { PayItemService } from './pay-item.service';

describe('PayItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayItemService = TestBed.get(PayItemService);
    expect(service).toBeTruthy();
  });
});
