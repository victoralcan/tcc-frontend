import axios from 'axios';
import authHeader from './authHeader';
import { API_URL } from './config';

export const getOrderList = (userId) => {
  return axios
    .get(`${API_URL}/orders/${userId}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const getOrderSearch = (userId, filter) => {
  return axios
    .post(`${API_URL}/order/search/${userId}`, filter, { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const getOrderListByUser = (userId, customerId) => {
  return axios
    .get(`${API_URL}/orders/by-user/${customerId}/${userId}`, {
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

export const getOrder = (id) => {
  return axios
    .get(`${API_URL}/order/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const generateNFOrder = (userId, order) => {
  return axios
    .post(`${API_URL}/order/bling-exportation/${userId}`, order, { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
