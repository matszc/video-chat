import { TestBed } from '@angular/core/testing';

import { VcMessageService } from './vc-message.service';

describe('VcMessageService', () => {
  let service: VcMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VcMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
