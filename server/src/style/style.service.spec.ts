import { Test, TestingModule } from '@nestjs/testing';
import { StyleService } from './style.service';

describe('StyleService', () => {
  let service: StyleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StyleService],
    }).compile();

    service = module.get<StyleService>(StyleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
