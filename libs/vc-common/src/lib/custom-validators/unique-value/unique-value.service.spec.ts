import { Test, TestingModule } from '@nestjs/testing';
import { UniqueValueConstraint } from './unique-value.service';

describe('UniqueValueService', () => {
  let service: UniqueValueConstraint;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniqueValueConstraint],
    }).compile();

    service = module.get<UniqueValueConstraint>(UniqueValueConstraint);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
