import { AuthGuard } from './auth.guard';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockExecutionContext: Partial<ExecutionContext>;
  let mockRequest: Partial<Request>;

  beforeEach(() => {
    guard = new AuthGuard();
    mockRequest = {};
    mockExecutionContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      }),
    };
  });

  describe('canActivate', () => {
    it('should return true when session token is present', () => {
      mockRequest.cookies = {
        'better-auth.session_token': 'valid-session-token',
      };

      const result = guard.canActivate(mockExecutionContext as ExecutionContext);

      expect(result).toBe(true);
    });

    it('should throw UnauthorizedException when session token is missing', () => {
      mockRequest.cookies = {};

      expect(() => {
        guard.canActivate(mockExecutionContext as ExecutionContext);
      }).toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when cookies are undefined', () => {
      mockRequest.cookies = undefined;

      expect(() => {
        guard.canActivate(mockExecutionContext as ExecutionContext);
      }).toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException with correct message', () => {
      mockRequest.cookies = {};

      expect(() => {
        guard.canActivate(mockExecutionContext as ExecutionContext);
      }).toThrow('Authentication required');
    });

    it('should handle null cookies', () => {
      mockRequest.cookies = null;

      expect(() => {
        guard.canActivate(mockExecutionContext as ExecutionContext);
      }).toThrow(UnauthorizedException);
    });

    it('should handle empty session token', () => {
      mockRequest.cookies = {
        'better-auth.session_token': '',
      };

      expect(() => {
        guard.canActivate(mockExecutionContext as ExecutionContext);
      }).toThrow(UnauthorizedException);
    });
  });
});