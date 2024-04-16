import { Test, TestingModule } from '@nestjs/testing';
import { CometsRequestsController } from './comets_requests.controller';
import { CometsRequestsService } from './comets_requests.service';

describe('CometsRequestsController', () => {
  let controller: CometsRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CometsRequestsController],
      providers: [CometsRequestsService],
    }).compile();

    controller = module.get<CometsRequestsController>(CometsRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
