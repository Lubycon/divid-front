import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

const axiosInstance = axios.create({ baseURL: 'http://localhost' }) 

type DefaultRequestParams = 'headers' | 'params' | 'paramsSerializer' | 'timeout';
type WithoutRequestBodyConfig = Pick<AxiosRequestConfig, DefaultRequestParams >
type RequestBodyConfig = Pick<AxiosRequestConfig, DefaultRequestParams | 'data'>

function axiosResponseHandler<T>(response: AxiosResponse<T>) {
  return response.data;
}

async function get<ResponseBody>(path: string, config?: WithoutRequestBodyConfig) {
  return axiosResponseHandler(await axiosInstance.get<ResponseBody>(path, config))
}

async function post<ResponseBody, RequestBody>(path: string, data?: RequestBody, config?: RequestBodyConfig) {
  return axiosResponseHandler(await axiosInstance.post<ResponseBody>(path, data, config))
}

async function put<ResponseBody, RequestBody>(path: string, data?: RequestBody, config?: RequestBodyConfig) {
  return axiosResponseHandler(await axiosInstance.put<ResponseBody>(path, data, config))
}

async function remove<ResponseBody>(path: string, config?: WithoutRequestBodyConfig) {
  return axiosResponseHandler(await axiosInstance.delete<ResponseBody>(path, config))
}

export default {
  get, post, put, delete: remove
}