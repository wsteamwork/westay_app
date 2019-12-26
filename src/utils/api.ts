/* eslint-disable linebreak-style */
import axiosBase from 'axios';

const DOMAIN = 'https://dev.example.com/'; //API URL

// export const TOKEN = 'token'; // For authorize

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

export const axios = instance;
