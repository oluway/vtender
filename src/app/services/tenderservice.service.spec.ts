import { TestBed } from '@angular/core/testing';

import { TenderserviceService } from './tenderservice.service';

describe('TenderserviceService', () => {
  let service: TenderserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenderserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
