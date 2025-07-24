import axios from 'axios';
import { get, post, patch, remove } from '../index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('axios wrapper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls axios.get with correct params', async () => {
    mockedAxios.get.mockResolvedValue({ data: 'ok' });
    const result = await get('/test', { foo: 'bar' }, 'json');
    expect(mockedAxios.get).toHaveBeenCalledWith('/test', {
      params: { foo: 'bar' },
      withCredentials: true,
      responseType: 'json',
    });
    expect(result).toEqual({ data: 'ok' });
  });

  it('calls axios.post with correct params', async () => {
    mockedAxios.post.mockResolvedValue({ data: 'posted' });
    const result = await post('/test', { a: 1 }, { foo: 'bar' }, 'blob');
    expect(mockedAxios.post).toHaveBeenCalledWith(
      '/test',
      { a: 1 },
      {
        params: { foo: 'bar' },
        responseType: 'blob',
      }
    );
    expect(result).toEqual({ data: 'posted' });
  });

  it('calls axios.patch with correct params', async () => {
    mockedAxios.patch.mockResolvedValue({ data: 'patched' });
    const result = await patch('/test', { b: 2 });
    expect(mockedAxios.patch).toHaveBeenCalledWith('/test', { b: 2 });
    expect(result).toEqual({ data: 'patched' });
  });

  it('calls axios.delete with correct params', async () => {
    mockedAxios.delete.mockResolvedValue({ data: 'deleted' });
    const result = await remove('/test', { foo: 'bar' });
    expect(mockedAxios.delete).toHaveBeenCalledWith('/test', {
      params: { foo: 'bar' },
      withCredentials: true,
    });
    expect(result).toEqual({ data: 'deleted' });
  });
});
