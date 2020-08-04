import { TestBed } from '@angular/core/testing';

import { DashboardGaurdService } from './dashboard-gaurd.service';

describe('DashboardGaurdService', () => {
  let service: DashboardGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
