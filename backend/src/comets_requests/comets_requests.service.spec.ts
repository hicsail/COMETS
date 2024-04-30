import { Test, TestingModule } from '@nestjs/testing';
import { CometsRequestsService } from './comets_requests.service';

describe('CometsRequestsService', () => {
  let service: CometsRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CometsRequestsService],
    }).compile();

    service = module.get<CometsRequestsService>(CometsRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
