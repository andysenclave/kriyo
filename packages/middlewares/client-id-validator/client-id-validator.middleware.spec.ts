import { UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import ClientIdValidatorMiddleware from './client-id-validator.middleware';

describe('ClientIdValidatorMiddleware', () => {
  let middleware: ClientIdValidatorMiddleware;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    middleware = new ClientIdValidatorMiddleware();
    mockRequest = {
      header: jest.fn(),
    };
    mockResponse = {};
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('setAllowedClientIds', () => {
    it('should set allowed client IDs', () => {
      const clientIds = ['client1', 'client2', 'client3'];
      middleware.setAllowedClientIds(clientIds);

      // Access private property for testing
      const allowedClientIds = (middleware as any).allowedClientIds;
      expect(allowedClientIds.size).toBe(3);
      expect(allowedClientIds.has('client1')).toBe(true);
      expect(allowedClientIds.has('client2')).toBe(true);
      expect(allowedClientIds.has('client3')).toBe(true);
    });

    it('should replace existing client IDs when called multiple times', () => {
      middleware.setAllowedClientIds(['client1', 'client2']);
      middleware.setAllowedClientIds(['client3', 'client4']);

      const allowedClientIds = (middleware as any).allowedClientIds;
      expect(allowedClientIds.size).toBe(2);
      expect(allowedClientIds.has('client1')).toBe(false);
      expect(allowedClientIds.has('client3')).toBe(true);
      expect(allowedClientIds.has('client4')).toBe(true);
    });

    it('should handle empty array', () => {
      middleware.setAllowedClientIds([]);

      const allowedClientIds = (middleware as any).allowedClientIds;
      expect(allowedClientIds.size).toBe(0);
    });
  });

  describe('use', () => {
    beforeEach(() => {
      middleware.setAllowedClientIds(['valid-client-1', 'valid-client-2']);
    });

    it('should call next() when CLIENT_ID is valid', () => {
      (mockRequest.header as jest.Mock).mockReturnValue('valid-client-1');

      middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockRequest.header).toHaveBeenCalledWith('CLIENT_ID');
      expect(mockNext).toHaveBeenCalled();
    });

    it('should throw UnauthorizedException when CLIENT_ID is missing', () => {
      (mockRequest.header as jest.Mock).mockReturnValue(undefined);

      expect(() => {
        middleware.use(mockRequest as Request, mockResponse as Response, mockNext);
      }).toThrow(UnauthorizedException);

      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException when CLIENT_ID is empty string', () => {
      (mockRequest.header as jest.Mock).mockReturnValue('');

      expect(() => {
        middleware.use(mockRequest as Request, mockResponse as Response, mockNext);
      }).toThrow(UnauthorizedException);

      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException when CLIENT_ID is not in allowed list', () => {
      (mockRequest.header as jest.Mock).mockReturnValue('invalid-client');

      expect(() => {
        middleware.use(mockRequest as Request, mockResponse as Response, mockNext);
      }).toThrow(UnauthorizedException);

      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException with correct error message', () => {
      (mockRequest.header as jest.Mock).mockReturnValue('invalid-client');

      expect(() => {
        middleware.use(mockRequest as Request, mockResponse as Response, mockNext);
      }).toThrow('Invalid or missing CLIENT_ID');
    });

    it('should handle case sensitivity correctly', () => {
      middleware.setAllowedClientIds(['Client1']);
      (mockRequest.header as jest.Mock).mockReturnValue('client1');

      expect(() => {
        middleware.use(mockRequest as Request, mockResponse as Response, mockNext);
      }).toThrow(UnauthorizedException);

      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should work with no allowed client IDs set', () => {
      const freshMiddleware = new ClientIdValidatorMiddleware();
      (mockRequest.header as jest.Mock).mockReturnValue('any-client');

      expect(() => {
        freshMiddleware.use(mockRequest as Request, mockResponse as Response, mockNext);
      }).toThrow(UnauthorizedException);

      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});
