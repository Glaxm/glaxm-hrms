import { TestBed } from '@angular/core/testing';

import { EmpGradeService } from './emp-grade.service';

describe('EmpGradeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpGradeService = TestBed.get(EmpGradeService);
    expect(service).toBeTruthy();
  });
});
