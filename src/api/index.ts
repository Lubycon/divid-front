import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getLocalStorage } from 'utils';
import jwt_decode from 'jwt-decode';
import { Token } from './types';

const axiosInstance = axios.create({
  baseURL: 'http://www.divid.kr:8081',
  headers: {
    JwtAccessToken: getLocalStorage('accessToken')
  }
});

async function checkToken(config: AxiosRequestConfig) {
  let accessToken = getLocalStorage<string>('accessToken');
  if (accessToken === null) return config;

  const decode: Token = jwt_decode(accessToken);
  const currentTime = Date.now() / 1000;

  if (decode.exp < currentTime) {
    const refreshToken = getLocalStorage<string>('refreshToken');
    accessToken = refreshToken;
  }

  config.headers['JwtAccessToken'] = accessToken;
  console.log({ config });
  return config;
}

axiosInstance.interceptors.request.use(checkToken);
axiosInstance.interceptors.response.use();

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
