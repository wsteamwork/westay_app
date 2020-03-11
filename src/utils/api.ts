/* eslint-disable linebreak-style */
import axiosBase, {AxiosInstance} from 'axios';

export type AxiosRequestType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const DOMAIN = 'https://dev.westay.vn/customer-api/'; //API URL Customer
const MERCHANT_URL = 'https://dev.westay.vn/merchant-api/'; //API URL Merchant
// const DOMAIN = 'http://ws_api.lc/customer-api/'; //API URL

export const TOKEN = 'token'; // For authorize

const headers = {
  Accept: 'application/json',
  'Content-Language': 'en-EN',
  'Content-Type': 'application/json',
};

const instance = axiosBase.create({
  baseURL: DOMAIN,
  withCredentials: true,
  headers,
});

const instance_merchant: AxiosInstance = axiosBase.create({
  baseURL: MERCHANT_URL,
  withCredentials: true,
  headers,
});

export const axios = instance;
export const axios_merchant = instance_merchant;
