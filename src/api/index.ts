import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getLocalStorage, setLocalStorage } from 'utils';
import jwt_decode from 'jwt-decode';
import { Token } from './types';

const axiosInstance = axios.create({
  // baseURL: 'http://ec2-3-37-82-85.ap-northeast-2.compute.amazonaws.com:8081'
  baseURL: 'https://api.divid.kr'
});

async function checkToken(config: AxiosRequestConfig) {
  const accessToken = getLocalStorage<string>('accessToken');
  const refreshToken = getLocalStorage<string>('refreshToken');
  if (accessToken === null) return config;

  const decode: Token = jwt_decode(accessToken);
  const currentTime = Date.now() / 1000;

  if (decode.exp < currentTime) {
    return {
      ...config,
      headers: { ...config.headers, accessToken, refreshToken }
    };
  }

  return { ...config, headers: { ...config.headers, accessToken } };
}

async function changeToken(response: AxiosResponse) {
  const newToken = response.data.accessToken;
  const oldToken = getLocalStorage<string>('accessToken');
  if (typeof newToken !== 'undefined' && newToken !== oldToken) {
    setLocalStorage('accessToken', response.data.accessToken);
    setLocalStorage('refreshToken', response.data.refreshToken);
    return response;
  }
  return response;
}
axiosInstance.interceptors.request.use(checkToken);
axiosInstance.interceptors.response.use(changeToken);

type DefaultRequestParams = 'headers' | 'params' | 'paramsSerializer' | 'timeout';
export type WithoutRequestBodyConfig = Pick<AxiosRequestConfig, DefaultRequestParams>;
export type RequestBodyConfig = Pick<AxiosRequestConfig, DefaultRequestParams | 'data'>;

function axiosResponseHandler<T>(response: AxiosResponse<T>) {
  return response.data;
}

async function get<ResponseBody>(path: string, config?: WithoutRequestBodyConfig) {
  if (/(http|https)?:\/\//g.test(path)) {
    return axiosResponseHandler(await axios.get<ResponseBody>(path, config));
  }
  return axiosResponseHandler(await axiosInstance.get<ResponseBody>(path, config));
}

async function post<ResponseBody, RequestBody>(path: string, data?: RequestBody, config?: RequestBodyConfig) {
  if (/(http|https)?:\/\//g.test(path)) {
    return axiosResponseHandler(await axios.post<ResponseBody>(path, data, config));
  }
  return axiosResponseHandler(await axiosInstance.post<ResponseBody>(path, data, config));
}

async function put<ResponseBody, RequestBody>(path: string, data?: RequestBody, config?: RequestBodyConfig) {
  if (/(http|https)?:\/\//g.test(path)) {
    return axiosResponseHandler(await axios.put<ResponseBody>(path, data, config));
  }
  return axiosResponseHandler(await axiosInstance.put<ResponseBody>(path, data, config));
}

async function remove<ResponseBody>(path: string, config?: WithoutRequestBodyConfig) {
  if (/(http|https)?:\/\//g.test(path)) {
    return axiosResponseHandler(await axios.post<ResponseBody>(path, config));
  }
  return axiosResponseHandler(await axiosInstance.delete<ResponseBody>(path, config));
}

export default {
  get,
  post,
  put,
  delete: remove
};
