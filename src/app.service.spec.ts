import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { version } from '../package.json';

// Mock the package.json import
jest.mock('../package.json', () => ({
  version: '0.0.1',
}));

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getHello', () => {
    it('should return hello message with version', () => {
      const result = service.getHello();
      expect(result).toBe(
        `Hello from FLOW Africa Strategy version: ${version}`,
      );
    });
  });
});
