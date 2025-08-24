import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('ok', () => {
    it('should return health check response', () => {
      const result = controller.ok();

      expect(result).toEqual({
        ok: true,
        service: 'kriyo-api',
        version: 1,
      });
    });

    it('should always return ok: true', () => {
      const result = controller.ok();
      expect(result.ok).toBe(true);
    });

    it('should return correct service name', () => {
      const result = controller.ok();
      expect(result.service).toBe('kriyo-api');
    });

    it('should return version 1', () => {
      const result = controller.ok();
      expect(result.version).toBe(1);
    });

    it('should return consistent response on multiple calls', () => {
      const result1 = controller.ok();
      const result2 = controller.ok();

      expect(result1).toEqual(result2);
    });
  });
});