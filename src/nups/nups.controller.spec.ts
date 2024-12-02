import { Test, TestingModule } from '@nestjs/testing';
import { NupsController } from './nups.controller';
import { NupsService } from './nups.service';

describe('NupsController', () => {
  let controller: NupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NupsController],
      providers: [NupsService],
    }).compile();

    controller = module.get<NupsController>(NupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
