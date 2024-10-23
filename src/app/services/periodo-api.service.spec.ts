import { TestBed } from '@angular/core/testing';

import { PeriodoApiService } from './periodo-api.service';

describe('PeriodoApiService', () => {
  let service: PeriodoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
