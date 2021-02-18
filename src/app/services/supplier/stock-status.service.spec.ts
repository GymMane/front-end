import { TestBed } from '@angular/core/testing';

import { StockStatusService } from './stock-status.service';

describe('StockStatusService', () => {
  let service: StockStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
