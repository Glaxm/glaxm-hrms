import { TestBed } from '@angular/core/testing';

import { AssetitemService } from './assetitem.service';

describe('AssetitemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetitemService = TestBed.get(AssetitemService);
    expect(service).toBeTruthy();
  });
});
