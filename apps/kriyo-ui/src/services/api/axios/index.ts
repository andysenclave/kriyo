import axios, { ResponseType } from 'axios';

/* istanbul ignore next */
export const get = async (url: string, params = {}, responseType?: ResponseType) => {
  return await axios.get(url, { params: params, withCredentials: true, responseType });
};

export const post = async (
  url: string,
  data: unknown,
  /* istanbul ignore next */
  params = {},
  responseType?: ResponseType
) => {
  return await axios.post(url, data, { params: params, responseType });
};

export const patch = async (url: string, data: unknown) => {
  return await axios.patch(url, data);
};

/* istanbul ignore next */
export const remove = async (url: string, params = {}) => {
  return await axios.delete(url, { params: params, withCredentials: true });
};
