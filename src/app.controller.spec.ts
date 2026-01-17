import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getHello: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getHello', () => {
    it('should return app version message', () => {
      const expectedMessage = 'Hello from FLOW Africa Strategy version: 0.0.1';
      const getHelloSpy = jest
        .spyOn(service, 'getHello')
        .mockReturnValue(expectedMessage);

      const result = controller.getHello();

      expect(getHelloSpy).toHaveBeenCalled();
      expect(result).toBe(expectedMessage);
    });
  });
});
