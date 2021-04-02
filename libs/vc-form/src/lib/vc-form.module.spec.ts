import { async, TestBed } from '@angular/core/testing';
import { VcFormModule } from './vc-form.module';

describe('VcFormModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [VcFormModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(VcFormModule).toBeDefined();
  });
});
