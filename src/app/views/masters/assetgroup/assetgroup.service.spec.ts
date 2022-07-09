import { TestBed } from '@angular/core/testing';

import { AssetgroupService } from './assetgroup.service';

describe('AssetgroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetgroupService = TestBed.get(AssetgroupService);
    expect(service).toBeTruthy();
  });
});
