import { Test, TestingModule } from '@nestjs/testing';
import { NupsService } from './nups.service';

describe('NupsService', () => {
  let service: NupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NupsService,
        {
          provide: 'NupRepository',
          useValue: {}, // mock implementation of NupRepository
        },
      ],
    }).compile();

    service = module.get<NupsService>(NupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
