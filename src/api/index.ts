import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosInstance = axios.create({ baseURL: 'http://ec2-3-37-82-85.ap-northeast-2.compute.amazonaws.com:8081' });

type DefaultRequestParams = 'headers' | 'params' | 'paramsSerializer' | 'timeout';
export type WithoutRequestBodyConfig = Pick<AxiosRequestConfig, DefaultRequestParams>;
export type RequestBodyConfig = Pick<AxiosRequestConfig, DefaultRequestParams | 'data'>;

function axiosResponseHandler<T>(response: AxiosResponse<T>) {
  return { data: response.data, headers: response.headers };
}

async function get<ResponseBody>(path: string, config?: WithoutRequestBodyConfig) {
  if (/^[http|https:\/\/]/.test(path)) {
    return axiosResponseHandler(await axios.get<ResponseBody>(path, config));
  }
  return axiosResponseHandler(await axiosInstance.get<ResponseBody>(path, config));
}

async function post<ResponseBody, RequestBody>(path: string, data?: RequestBody, config?: RequestBodyConfig) {
  if (/^[http|https:\/\/]/.test(path)) {
    return axiosResponseHandler(await axios.post<ResponseBody>(path, data, config));
  }
  return axiosResponseHandler(await axiosInstance.post<ResponseBody>(path, data, config));
}

async function put<ResponseBody, RequestBody>(path: string, data?: RequestBody, config?: RequestBodyConfig) {
  if (/^[http|https:\/\/]/.test(path)) {
    return axiosResponseHandler(await axios.put<ResponseBody>(path, data, config));
  }
  return axiosResponseHandler(await axiosInstance.put<ResponseBody>(path, data, config));
}

async function remove<ResponseBody>(path: string, config?: WithoutRequestBodyConfig) {
  if (/^[http|https:\/\/]/.test(path)) {
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
