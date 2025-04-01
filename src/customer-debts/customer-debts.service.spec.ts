import { Test, TestingModule } from '@nestjs/testing';
import { CustomerDebtsService } from './customer-debts.service';

describe('CustomerDebtsService', () => {
  let service: CustomerDebtsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerDebtsService],
    }).compile();

    service = module.get<CustomerDebtsService>(CustomerDebtsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
