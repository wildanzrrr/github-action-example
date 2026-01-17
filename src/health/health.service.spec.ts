import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';
import { PrismaService } from '../prisma.service';

describe('HealthService', () => {
  let service: HealthService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        {
          provide: PrismaService,
          useValue: {
            $queryRaw: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HealthService>(HealthService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('checkHealth', () => {
    it('should return ok status when database is connected', async () => {
      jest
        .spyOn(prismaService, '$queryRaw')
        .mockResolvedValue([{ '?column?': 1 }]);

      const result = await service.checkHealth();

      expect(result.status).toBe('ok');
      expect(result.database.status).toBe('connected');
      expect(result.database.responseTime).toBeGreaterThanOrEqual(0);
      expect(result.timestamp).toBeDefined();
    });

    it('should return error status when database connection fails', async () => {
      const error = new Error('Connection failed');
      jest.spyOn(prismaService, '$queryRaw').mockRejectedValue(error);

      const result = await service.checkHealth();

      expect(result.status).toBe('error');
      expect(result.database.status).toBe('disconnected');
      expect(result.database.error).toBe('Connection failed');
      expect(result.timestamp).toBeDefined();
    });

    it('should return error status with unknown error message when non-Error is thrown', async () => {
      jest
        .spyOn(prismaService, '$queryRaw')
        .mockRejectedValue('Some string error');

      const result = await service.checkHealth();

      expect(result.status).toBe('error');
      expect(result.database.status).toBe('disconnected');
      expect(result.database.error).toBe('Unknown error');
      expect(result.timestamp).toBeDefined();
    });
  });
});
