import axios from 'axios';
import { BASE_URL_DEV, BASE_URL_PROD } from './../constants';

export const getBaseUrl = () => {
  return process.env.NODE_ENV === 'production' ? BASE_URL_PROD : BASE_URL_DEV;
}

export const getUrl = (url) => {
  return getBaseUrl() + url;
}

// Http config, (e.g content-type, authorization, ...etc)
export const httpConfig = () => {
  return {
    headers: {
      'content-type': 'application/json'
    }
  }
}

export const api = {
  // GET Method
  get: (url) => {
    return axios.get(getUrl(url), httpConfig());
  },
  // POST Method
  post: (url, payload) => {
    url = getBaseUrl(url);
    return axios.post(getUrl(url), payload, httpConfig());
  },
  // PUT Method
  put: (url) => {
    return axios.post(getUrl(url), payload, httpConfig());
  },
  // DELETE Method
  delete: (url, id) => {
    return axios.delete(getUrl(url + id), httpConfig());
  }
}