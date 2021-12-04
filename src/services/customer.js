import axios from 'axios';
import authHeader from './authHeader';
import { API_URL } from './config';

export const getCustomerList = (userId) => {
  return axios
    .get(`${API_URL}/customers/${userId}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const getCustomer = (userId, customerId) => {
  return axios
    .get(`${API_URL}/customer/${customerId}/${userId}`, {
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

export const getCustomerFilter = (userId, filter) => {
  return axios
    .post(`${API_URL}/customers/search/${userId}`, filter, {
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

export const updateCustomer = (userId, customer) => {
  return axios
    .put(`${API_URL}/customer/${customer.id}/${userId}`, customer, {
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

export const createCustomer = (userId, customer) => {
  return axios
    .post(`${API_URL}/customer/create/${userId}`, customer, {
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

export const getStatusValues = (userId) => {
  return axios
    .get(`${API_URL}/customer-status-values/${userId}`, {
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

export const removeCustomer = (userId, customerId) => {
  return axios
    .delete(`${API_URL}/customer/${customerId}/${userId}`, {
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

export const updateCreditCardCustomer = (userId, customerId, cardForm) => {
  return axios
    .put(`${API_URL}/customer/credit-card/${customerId}/${userId}`, cardForm, {
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

export const updateRoleUser = (userId, customerId, role) => {
  return axios
    .put(`${API_URL}/customer/change-role/${customerId}/${userId}`, role, {
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
