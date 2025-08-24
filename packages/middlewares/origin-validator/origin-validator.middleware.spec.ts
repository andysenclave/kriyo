import { ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import OriginValidatorMiddleware from './origin-validator.middleware';

describe('OriginValidatorMiddleware', () => {
  let middleware: OriginValidatorMiddleware;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    middleware = new OriginValidatorMiddleware();
    mockRequest = {
      headers: {},
    };
    mockResponse = {};
    nextFunction = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('setAllowedOrigins', () => {
    it('should set allowed origins correctly', () => {
      const origins = ['https://example.com', 'https://test.com'];
      middleware.setAllowedOrigins(origins);

      // Test that origins are set by checking validation behavior
      mockRequest.headers = { origin: 'https://example.com' };
      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).not.toThrow();
      expect(nextFunction).toHaveBeenCalled();
    });

    it('should replace existing origins when called multiple times', () => {
      // Set initial origins
      middleware.setAllowedOrigins(['https://old.com']);

      // Replace with new origins
      middleware.setAllowedOrigins(['https://new.com']);

      mockRequest.headers = { origin: 'https://old.com' };
      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).toThrow(ForbiddenException);

      mockRequest.headers = { origin: 'https://new.com' };
      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).not.toThrow();
    });

    it('should handle empty origins array', () => {
      middleware.setAllowedOrigins([]);

      mockRequest.headers = { origin: 'https://example.com' };
      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).toThrow(ForbiddenException);
    });

    it('should handle duplicate origins', () => {
      const origins = ['https://example.com', 'https://example.com', 'https://test.com'];
      middleware.setAllowedOrigins(origins);

      mockRequest.headers = { origin: 'https://example.com' };
      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).not.toThrow();
      expect(nextFunction).toHaveBeenCalled();
    });
  });

  describe('use - origin validation', () => {
    beforeEach(() => {
      middleware.setAllowedOrigins([
        'https://example.com',
        'https://test.com',
        'http://localhost:3000',
      ]);
    });

    it('should allow requests with valid origin', () => {
      mockRequest.headers = { origin: 'https://example.com' };

      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).not.toThrow();
      expect(nextFunction).toHaveBeenCalledTimes(1);
    });

    it('should reject requests with invalid origin', () => {
      mockRequest.headers = { origin: 'https://malicious.com' };

      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).toThrow(ForbiddenException);
      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).toThrow('Access denied: Invalid origin');
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should handle case-sensitive origins', () => {
      mockRequest.headers = { origin: 'HTTPS://EXAMPLE.COM' };

      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).toThrow(ForbiddenException);
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should handle origins with different protocols', () => {
      mockRequest.headers = { origin: 'http://example.com' };

      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).toThrow(ForbiddenException);
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should handle origins with ports', () => {
      mockRequest.headers = { origin: 'http://localhost:3000' };

      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).not.toThrow();
      expect(nextFunction).toHaveBeenCalled();
    });
  });

  describe('use - referer validation', () => {
    beforeEach(() => {
      middleware.setAllowedOrigins(['https://example.com', 'https://test.com']);
    });

    it('should allow requests with valid referer', () => {
      mockRequest.headers = { referer: 'https://example.com/some/path' };

      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).not.toThrow();
      expect(nextFunction).toHaveBeenCalledTimes(1);
    });

    it('should allow requests with referer that starts with allowed origin', () => {
      mockRequest.headers = { referer: 'https://test.com/deep/nested/path?query=param' };

      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).not.toThrow();
      expect(nextFunction).toHaveBeenCalledTimes(1);
    });

    it('should reject requests with invalid referer', () => {
      mockRequest.headers = { referer: 'https://malicious.com/path' };

      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).toThrow(ForbiddenException);
      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).toThrow('Access denied: Invalid referer');
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should reject referer that partially matches but does not start with allowed origin', () => {
      mockRequest.headers = { referer: 'https://malicious-example.com/path' };

      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).toThrow(ForbiddenException);
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should handle referer with subdomain that does not match exact origin', () => {
      mockRequest.headers = { referer: 'https://sub.example.com/path' };

      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).toThrow(ForbiddenException);
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should handle empty referer string and fall back to host validation', () => {
      mockRequest.headers = { referer: '', host: 'example.com' };
      middleware.setAllowedOrigins(['http://example.com']);

      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).not.toThrow();
      expect(nextFunction).toHaveBeenCalled();
    });
  });

  describe('use - host validation (fallback)', () => {
    beforeEach(() => {
      middleware.setAllowedOrigins(['http://localhost:3000', 'https://example.com']);
    });

    it('should allow requests with valid host when no origin or referer', () => {
      mockRequest.headers = { host: 'localhost:3000' };

      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).not.toThrow();
      expect(nextFunction).toHaveBeenCalledTimes(1);
    });

    it('should reject requests with invalid host when no origin or referer', () => {
      mockRequest.headers = { host: 'malicious.com' };

      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).toThrow(ForbiddenException);
      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).toThrow('Access denied: Invalid host');
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should construct http URL from host header', () => {
      // Only http://example.com is allowed, not https://example.com in the allowed origins
      middleware.setAllowedOrigins(['http://example.com']);
      mockRequest.headers = { host: 'example.com' };

      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).not.toThrow();
      expect(nextFunction).toHaveBeenCalled();
    });

    it('should handle host with port numbers', () => {
      mockRequest.headers = { host: 'localhost:3000' };

      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).not.toThrow();
      expect(nextFunction).toHaveBeenCalled();
    });
  });

  describe('use - combined validation scenarios', () => {
    beforeEach(() => {
      middleware.setAllowedOrigins(['https://example.com', 'http://localhost:3000']);
    });

    it('should prioritize origin validation over referer when both are present', () => {
      mockRequest.headers = {
        origin: 'https://malicious.com',
        referer: 'https://example.com/valid/path',
      };

      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).toThrow('Access denied: Invalid origin');
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should validate referer when origin is valid', () => {
      mockRequest.headers = {
        origin: 'https://example.com',
        referer: 'https://malicious.com/path',
      };

      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).toThrow('Access denied: Invalid referer');
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should allow request when both origin and referer are valid', () => {
      mockRequest.headers = {
        origin: 'https://example.com',
        referer: 'https://example.com/some/path',
      };

      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).not.toThrow();
      expect(nextFunction).toHaveBeenCalledTimes(1);
    });

    it('should skip host validation when origin is present', () => {
      mockRequest.headers = {
        origin: 'https://example.com',
        host: 'malicious.com',
      };

      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).not.toThrow();
      expect(nextFunction).toHaveBeenCalledTimes(1);
    });

    it('should skip host validation when referer is present', () => {
      mockRequest.headers = {
        referer: 'https://example.com/path',
        host: 'malicious.com',
      };

      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).not.toThrow();
      expect(nextFunction).toHaveBeenCalledTimes(1);
    });

    it('should use host validation only when neither origin nor referer are present', () => {
      mockRequest.headers = {
        host: 'localhost:3000',
      };

      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).not.toThrow();
      expect(nextFunction).toHaveBeenCalledTimes(1);
    });
  });

  describe('use - edge cases', () => {
    beforeEach(() => {
      middleware.setAllowedOrigins(['https://example.com']);
    });

    it('should handle undefined headers object', () => {
      mockRequest.headers = undefined as any;

      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).toThrow();
    });

    it('should handle requests with no headers at all', () => {
      mockRequest = {};

      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).toThrow();
    });

    it('should handle null origin header and fall back to host validation', () => {
      mockRequest.headers = { origin: null as any, host: 'example.com' };
      middleware.setAllowedOrigins(['http://example.com']);

      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).not.toThrow();
      expect(nextFunction).toHaveBeenCalled();
    });

    it('should handle null referer header and fall back to host validation', () => {
      mockRequest.headers = { referer: null as any, host: 'example.com' };
      middleware.setAllowedOrigins(['http://example.com']);

      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).not.toThrow();
      expect(nextFunction).toHaveBeenCalled();
    });

    it('should handle undefined host header when no origin or referer', () => {
      mockRequest.headers = { host: undefined as any };

      expect(() =>
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).toThrow('Access denied: Invalid host');
    });

    it('should not call next function multiple times', () => {
      mockRequest.headers = { origin: 'https://example.com' };

      middleware.use(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalledTimes(1);
      expect(nextFunction).toHaveBeenCalledWith();
    });
  });

  describe('use - middleware before setAllowedOrigins', () => {
    it('should reject all requests when no allowed origins are set', () => {
      const freshMiddleware = new OriginValidatorMiddleware();
      mockRequest.headers = { origin: 'https://example.com' };

      expect(() =>
        freshMiddleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).toThrow(ForbiddenException);
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should reject host-only requests when no allowed origins are set', () => {
      const freshMiddleware = new OriginValidatorMiddleware();
      mockRequest.headers = { host: 'example.com' };

      expect(() =>
        freshMiddleware.use(mockRequest as Request, mockResponse as Response, nextFunction)
      ).toThrow('Access denied: Invalid host');
      expect(nextFunction).not.toHaveBeenCalled();
    });
  });
});
