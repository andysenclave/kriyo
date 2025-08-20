import axios, { ResponseType } from 'axios';
import config from '../config';

const getBaseConfig = (additionalConfig: Record<string, unknown> = {}) => {
  return {
    withCredentials: true,
    headers: {
      'CLIENT_ID': config.clientId,
      ...(additionalConfig.headers as Record<string, unknown>),
    },
    ...additionalConfig,
  };
};

/* istanbul ignore next */
export const get = async (url: string, params = {}, responseType?: ResponseType) => {
  const requestConfig = getBaseConfig({ params: params, responseType });
  return await axios.get(url, requestConfig);
};

export const post = async (
  url: string,
  data: unknown,
  /* istanbul ignore next */
  params = {},
  responseType?: ResponseType,
) => {
  const requestConfig = getBaseConfig({ params: params, responseType });
  return await axios.post(url, data, requestConfig);
};

export const patch = async (url: string, data: unknown) => {
  const requestConfig = getBaseConfig();
  return await axios.patch(url, data, requestConfig);
};

/* istanbul ignore next */
export const remove = async (url: string, params = {}) => {
  const requestConfig = getBaseConfig({ params: params });
  return await axios.delete(url, requestConfig);
};
