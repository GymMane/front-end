import { TestBed } from '@angular/core/testing';

import { MyKitService } from './my-kit.service';

describe('MyKitService', () => {
  let service: MyKitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyKitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
