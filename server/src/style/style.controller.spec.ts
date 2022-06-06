import { Test, TestingModule } from '@nestjs/testing';
import { StyleController } from './style.controller';
import { StyleService } from './style.service';

describe('StyleController', () => {
  let controller: StyleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StyleController],
      providers: [StyleService],
    }).compile();

    controller = module.get<StyleController>(StyleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
