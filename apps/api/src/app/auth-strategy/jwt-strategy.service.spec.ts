import { TestBed } from '@angular/core/testing';

import { JwtStrategyService } from './jwt-strategy.service';

describe('JwtStrategyService', () => {
  let service: JwtStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
