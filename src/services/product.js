import axios from 'axios';
import authHeader from './authHeader';
import { API_URL } from './config';

export const getProductList = () => {
  return axios
    .get(`${API_URL}/products/`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const getProduct = (id) => {
  return axios
    .get(`${API_URL}/product/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const createProduct = (userId, product) => {
  return axios
    .post(`${API_URL}/product/create/${userId}`, product, {
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

export const removeProduct = (userId, productId) => {
  return axios
    .delete(`${API_URL}/product/${productId}/${userId}`, {
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

export const updateProduct = (userId, product) => {
  return axios
    .put(`${API_URL}/product/${product.id}/${userId}`, product, {
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

export const updateImages = (userId, productId, images) => {
  return axios
    .put(`${API_URL}/product/images/${productId}/${userId}`, images, {
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
