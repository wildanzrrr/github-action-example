import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let controller: HealthController;
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useValue: {
            checkHealth: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('checkHealth', () => {
    it('should return health status', async () => {
      const mockResponse = {
        status: 'ok' as const,
        timestamp: '2026-01-09T12:00:00.000Z',
        database: {
          status: 'connected' as const,
          responseTime: 15,
        },
      };

      jest.spyOn(service, 'checkHealth').mockResolvedValue(mockResponse);

      const result = await controller.checkHealth();

      expect(result).toEqual(mockResponse);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.checkHealth).toHaveBeenCalled();
    });
  });
});
