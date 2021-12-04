import axios from "axios";
import authHeader from "./authHeader";
import { API_URL } from "./config";

export const getExchangeList = (userId) => {
  return axios
    .get(`${API_URL}/exchanges/${userId}`, {
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

export const getExchangeFilter = (userId, filter) => {
  return axios
    .post(`${API_URL}/exchange/search/${userId}`, filter, {
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

export const getExchange = (userId, id) => {
  return axios
    .get(`${API_URL}/exchange/${id}/${userId}`, {
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

export const createExchange = (userId, exchange) => {
  return axios
    .post(`${API_URL}/exchange/create/${exchange.user}/${userId}`, exchange, {
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

export const removeExchange = (userId, exchangeId) => {
  return axios
    .delete(`${API_URL}/exchange/${exchangeId}/${userId}`, {
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

export const updateExchange = (userId, exchange) => {
  return axios
    .put(`${API_URL}/exchange/${exchange.id}/${userId}`, exchange, {
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
    .get(`${API_URL}/exchange/status-values/${userId}`, {
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

export const getExchangeListByUser = (userId, customerId) => {
  return axios
    .get(`${API_URL}/exchanges/by-user/${customerId}/${userId}`, {
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

export const processExchange = (userId, exchangeId) => {
  return axios
    .post(
      `${API_URL}/exchange/process/${exchangeId}/${userId}`,
      {},
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const checkBeforeCreate = (userId, customerId) => {
  return axios
    .get(`${API_URL}/exchange/beforeCreate/${customerId}/${userId}`, {
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

export const cancelExchange = (userId, exchange) => {
  return axios
    .put(`${API_URL}/exchange/cancel/${exchange.id}/${userId}`, exchange, {
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