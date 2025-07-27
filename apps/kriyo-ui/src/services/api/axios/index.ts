import axios, { ResponseType } from 'axios';

// Function to get auth token from localStorage
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('kriyo_auth_token');
};

// Add auth header to requests
const addAuthHeader = (config: Record<string, unknown> = {}) => {
  const token = getAuthToken();
  if (token) {
    config.headers = {
      ...(config.headers as Record<string, unknown>),
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
};

/* istanbul ignore next */
export const get = async (url: string, params = {}, responseType?: ResponseType) => {
  const config = addAuthHeader({ params: params, withCredentials: true, responseType });
  return await axios.get(url, config);
};

export const post = async (
  url: string,
  data: unknown,
  /* istanbul ignore next */
  params = {},
  responseType?: ResponseType
) => {
  const config = addAuthHeader({ params: params, responseType });
  return await axios.post(url, data, config);
};

export const patch = async (url: string, data: unknown) => {
  const config = addAuthHeader();
  return await axios.patch(url, data, config);
};

/* istanbul ignore next */
export const remove = async (url: string, params = {}) => {
  const config = addAuthHeader({ params: params, withCredentials: true });
  return await axios.delete(url, config);
};
