import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;
  let mockCacheManager: any;

  beforeEach(async () => {
    mockCacheManager = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
      clear: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('should return value from cache', async () => {
      const key = 'test-key';
      const value = 'test-value';
      mockCacheManager.get.mockResolvedValue(value);

      const result = await service.get(key);

      expect(mockCacheManager.get).toHaveBeenCalledWith(key);
      expect(result).toBe(value);
    });

    it('should return undefined when cache returns null', async () => {
      const key = 'test-key';
      mockCacheManager.get.mockResolvedValue(null);

      const result = await service.get(key);

      expect(result).toBeUndefined();
    });
  });

  describe('set', () => {
    it('should set value in cache', async () => {
      const key = 'test-key';
      const value = 'test-value';
      const ttl = 300;

      await service.set(key, value, ttl);

      expect(mockCacheManager.set).toHaveBeenCalledWith(key, value, ttl);
    });

    it('should set value in cache without ttl', async () => {
      const key = 'test-key';
      const value = 'test-value';

      await service.set(key, value);

      expect(mockCacheManager.set).toHaveBeenCalledWith(key, value, undefined);
    });
  });

  describe('del', () => {
    it('should delete value from cache', async () => {
      const key = 'test-key';

      await service.del(key);

      expect(mockCacheManager.del).toHaveBeenCalledWith(key);
    });
  });

  describe('reset', () => {
    it('should clear cache', async () => {
      await service.reset();

      expect(mockCacheManager.clear).toHaveBeenCalled();
    });
  });

  describe('keys', () => {
    it('should return empty array', async () => {
      const result = await service.keys();

      expect(result).toEqual([]);
    });
  });

  describe('generateCacheKey', () => {
    it('should generate cache key with prefix and args', () => {
      const prefix = 'test';
      const args = ['user', 123, 'data'];

      const result = service.generateCacheKey(prefix, ...args);

      expect(result).toBe('test:user:123:data');
    });

    it('should generate cache key with only prefix', () => {
      const prefix = 'test';

      const result = service.generateCacheKey(prefix);

      expect(result).toBe('test:');
    });
  });
});