import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

enum RequestMethods {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE'
}

interface RequestParams {
  method: RequestMethods,
  uri: string,
  data?: any,
  config?: any
}

async function request(method: RequestMethods, uri: string, data = {}, config = {}) {
  const requestConfig = { ...config, method, uri };
  const response = await axios(requestConfig);

  return response;
}

const req = {
  get: request.bind(null, RequestMethods.Get),
  post: request.bind(null, RequestMethods.Post),
  put: request.bind(null, RequestMethods.Put),
  delete: request.bind(null, RequestMethods.Delete)
};

export const API = {
  login: { uri: '/users/login', request: req.post },
  profile: {
    modify: { uri: '/users', request: req.put },
    view: { uri: '/users', request: req.get },
    withdraw: { uri: '/users', request: req.delete }
  },
  trip: {
    add: { uri: '/users/trips', request: req.post },
    view: { uri: '/users/trips/all', request: req.get }
  }
};

interface ApiContent {
  uri: string;
  request: (uri: string, data?: {} | undefined, config?: {} | undefined) => Promise<AxiosResponse<any>>;
}

interface UseApiParams {
  api: ApiContent;
  data?: {params: any};
  success: (data: any) => void;
  fail: (error: any) => void;
  config?: any;
}

export function useApi({
  api,
  data = {params: {}},
  success,
  fail,
  config = {}
}: UseApiParams) {
  const [loading, setLoading] = useState(true);
  
  async function fetchApi() {
    try {
      const response = await api.request(api.uri, api.request === req.get ? data : data.params, config);

      success?.(response.data);
    } catch (e) {
      fail?.(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApi();
  }, [api.uri])

  return [loading]
 }