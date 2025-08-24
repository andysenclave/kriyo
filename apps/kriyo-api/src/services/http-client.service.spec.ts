import { Test, TestingModule } from '@nestjs/testing';
import { HttpClientService } from './http-client.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { Logger } from '@nestjs/common';

describe('HttpClientService', () => {
  let service: HttpClientService;
  let httpService: HttpService;

  const mockHttpService = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpClientService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<HttpClientService>(HttpClientService);
    httpService = module.get<HttpService>(HttpService);

    jest.spyOn(Logger.prototype, 'log').mockImplementation();

    // Set up environment variable for CLIENT_ID
    process.env.CLIENT_ID = 'test-client-id';
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.CLIENT_ID;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    const mockResponse = { data: { message: 'success' } };

    it('should make GET request to auth service successfully', async () => {
      mockHttpService.get.mockReturnValue(of(mockResponse));

      const result = await service.get('auth', '/test-endpoint');

      expect(httpService.get).toHaveBeenCalledWith(
        'http://localhost:4000/test-endpoint',
        {
          headers: {
            CLIENT_ID: 'test-client-id',
          },
        },
      );
      expect(result).toEqual({ message: 'success' });
    });

    it('should make GET request to user service successfully', async () => {
      mockHttpService.get.mockReturnValue(of(mockResponse));

      const result = await service.get('user', '/users/123');

      expect(httpService.get).toHaveBeenCalledWith(
        'http://localhost:4200/users/123',
        {
          headers: {
            CLIENT_ID: 'test-client-id',
          },
        },
      );
      expect(result).toEqual({ message: 'success' });
    });

    it('should make GET request to tasks service successfully', async () => {
      mockHttpService.get.mockReturnValue(of(mockResponse));

      const result = await service.get('tasks', '/tasks');

      expect(httpService.get).toHaveBeenCalledWith(
        'http://localhost:4400/tasks',
        {
          headers: {
            CLIENT_ID: 'test-client-id',
          },
        },
      );
      expect(result).toEqual({ message: 'success' });
    });

    it('should make GET request to projects service successfully', async () => {
      mockHttpService.get.mockReturnValue(of(mockResponse));

      const result = await service.get('projects', '/projects');

      expect(httpService.get).toHaveBeenCalledWith(
        'http://localhost:4600/projects',
        {
          headers: {
            CLIENT_ID: 'test-client-id',
          },
        },
      );
      expect(result).toEqual({ message: 'success' });
    });

    it('should merge CLIENT_ID with existing headers', async () => {
      const existingHeaders = { Authorization: 'Bearer token' };
      mockHttpService.get.mockReturnValue(of(mockResponse));

      await service.get('auth', '/test-endpoint', existingHeaders);

      expect(httpService.get).toHaveBeenCalledWith(
        'http://localhost:4000/test-endpoint',
        {
          headers: {
            Authorization: 'Bearer token',
            CLIENT_ID: 'test-client-id',
          },
        },
      );
    });

    it('should log the request', async () => {
      const logSpy = jest.spyOn(Logger.prototype, 'log');
      mockHttpService.get.mockReturnValue(of(mockResponse));

      await service.get('auth', '/test-endpoint');

      expect(logSpy).toHaveBeenCalledWith(
        'Fetching auth with url http://localhost:4000/test-endpoint',
      );
    });

    it('should handle request errors', async () => {
      const error = new Error('Request failed');
      mockHttpService.get.mockReturnValue(throwError(() => error));

      await expect(service.get('auth', '/test-endpoint')).rejects.toThrow(
        'Request failed',
      );
    });

    it('should handle undefined CLIENT_ID', async () => {
      delete process.env.CLIENT_ID;
      mockHttpService.get.mockReturnValue(of(mockResponse));

      await service.get('auth', '/test-endpoint');

      expect(httpService.get).toHaveBeenCalledWith(
        'http://localhost:4000/test-endpoint',
        {
          headers: {
            CLIENT_ID: undefined,
          },
        },
      );
    });
  });

  describe('post', () => {
    const mockResponse = { data: { id: '123', message: 'created' } };
    const postData = { name: 'test', description: 'test data' };

    it('should make POST request successfully', async () => {
      mockHttpService.post.mockReturnValue(of(mockResponse));

      const result = await service.post('auth', '/test-endpoint', postData);

      expect(httpService.post).toHaveBeenCalledWith(
        'http://localhost:4000/test-endpoint',
        postData,
        {
          headers: {
            CLIENT_ID: 'test-client-id',
          },
        },
      );
      expect(result).toEqual({ id: '123', message: 'created' });
    });

    it('should merge CLIENT_ID with existing headers', async () => {
      const existingHeaders = { 'Content-Type': 'application/json' };
      mockHttpService.post.mockReturnValue(of(mockResponse));

      await service.post('user', '/users', postData, existingHeaders);

      expect(httpService.post).toHaveBeenCalledWith(
        'http://localhost:4200/users',
        postData,
        {
          headers: {
            'Content-Type': 'application/json',
            CLIENT_ID: 'test-client-id',
          },
        },
      );
    });

    it('should handle POST request errors', async () => {
      const error = new Error('POST failed');
      mockHttpService.post.mockReturnValue(throwError(() => error));

      await expect(service.post('tasks', '/tasks', postData)).rejects.toThrow(
        'POST failed',
      );
    });
  });

  describe('put', () => {
    const mockResponse = { data: { id: '123', message: 'updated' } };
    const putData = { name: 'updated test', description: 'updated data' };

    it('should make PUT request successfully', async () => {
      mockHttpService.put.mockReturnValue(of(mockResponse));

      const result = await service.put('projects', '/projects/123', putData);

      expect(httpService.put).toHaveBeenCalledWith(
        'http://localhost:4600/projects/123',
        putData,
        {
          headers: {
            CLIENT_ID: 'test-client-id',
          },
        },
      );
      expect(result).toEqual({ id: '123', message: 'updated' });
    });

    it('should merge CLIENT_ID with existing headers', async () => {
      const existingHeaders = { 'If-Match': 'etag-value' };
      mockHttpService.put.mockReturnValue(of(mockResponse));

      await service.put('tasks', '/tasks/123', putData, existingHeaders);

      expect(httpService.put).toHaveBeenCalledWith(
        'http://localhost:4400/tasks/123',
        putData,
        {
          headers: {
            'If-Match': 'etag-value',
            CLIENT_ID: 'test-client-id',
          },
        },
      );
    });

    it('should handle PUT request errors', async () => {
      const error = new Error('PUT failed');
      mockHttpService.put.mockReturnValue(throwError(() => error));

      await expect(service.put('user', '/users/123', putData)).rejects.toThrow(
        'PUT failed',
      );
    });
  });

  describe('delete', () => {
    const mockResponse = { data: { message: 'deleted' } };

    it('should make DELETE request successfully', async () => {
      mockHttpService.delete.mockReturnValue(of(mockResponse));

      const result = await service.delete('auth', '/test-endpoint/123');

      expect(httpService.delete).toHaveBeenCalledWith(
        'http://localhost:4000/test-endpoint/123',
        {
          headers: {
            CLIENT_ID: 'test-client-id',
          },
        },
      );
      expect(result).toEqual({ message: 'deleted' });
    });

    it('should merge CLIENT_ID with existing headers', async () => {
      const existingHeaders = { Authorization: 'Bearer token' };
      mockHttpService.delete.mockReturnValue(of(mockResponse));

      await service.delete('projects', '/projects/123', existingHeaders);

      expect(httpService.delete).toHaveBeenCalledWith(
        'http://localhost:4600/projects/123',
        {
          headers: {
            Authorization: 'Bearer token',
            CLIENT_ID: 'test-client-id',
          },
        },
      );
    });

    it('should handle DELETE request errors', async () => {
      const error = new Error('DELETE failed');
      mockHttpService.delete.mockReturnValue(throwError(() => error));

      await expect(service.delete('tasks', '/tasks/123')).rejects.toThrow(
        'DELETE failed',
      );
    });
  });

  describe('service URLs', () => {
    it('should use environment variables when available', () => {
      process.env.AUTH_SERVICE_URL = 'https://auth.example.com';
      process.env.USER_SERVICE_URL = 'https://user.example.com';
      process.env.TASKS_SERVICE_URL = 'https://tasks.example.com';
      process.env.PROJECTS_SERVICE_URL = 'https://projects.example.com';

      // Create a new instance to pick up the env vars
      const newService = new HttpClientService(httpService);
      const mockResponse = { data: { message: 'success' } };
      mockHttpService.get.mockReturnValue(of(mockResponse));

      newService.get('auth', '/test');
      expect(httpService.get).toHaveBeenCalledWith(
        'https://auth.example.com/test',
        expect.any(Object),
      );

      // Clean up
      delete process.env.AUTH_SERVICE_URL;
      delete process.env.USER_SERVICE_URL;
      delete process.env.TASKS_SERVICE_URL;
      delete process.env.PROJECTS_SERVICE_URL;
    });
  });
});
