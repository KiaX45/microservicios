import { Test, TestingModule } from '@nestjs/testing';
import { CustomerDebtsController } from './customer-debts.controller';
import { CustomerDebtsService } from './customer-debts.service';

describe('CustomerDebtsController', () => {
  let controller: CustomerDebtsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerDebtsController],
      providers: [CustomerDebtsService],
    }).compile();

    controller = module.get<CustomerDebtsController>(CustomerDebtsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
