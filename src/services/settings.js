import axios from 'axios';
import authHeader from './authHeader';
import { API_URL } from './config';

export const getSettings = (userId) => {
  return axios
    .get(`${API_URL}/settings/${userId}`, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const updateSettings = (userId, settings) => {
  return axios
    .put(`${API_URL}/settings/${userId}`, settings, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
