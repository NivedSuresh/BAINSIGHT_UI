import { TestBed } from '@angular/core/testing';

import { OrderPersistenceService } from './order-persistence.service';

describe('OrderPersistanceService', () => {
  let service: OrderPersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderPersistenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
