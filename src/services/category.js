import axios from 'axios';
import authHeader from './authHeader';
import { API_URL } from './config';

export const getCategoryList = () => {
  return axios.get(`${API_URL}/categories/`,{ headers: authHeader() })
  .then( response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const getCategory = ( id ) => {
  return axios.get(`${API_URL}/categories/${id}`,{ headers: authHeader() })
  .then( response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const createCategory = (table) => {
  return axios.post(`${API_URL}/categories/`, table, { headers: authHeader() })
  .then( response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const removeCategory = (tableId) => {
  return axios.delete(`${API_URL}/categories/${tableId}`, { headers: authHeader() })
  .then (response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const updateCategory = (table) => {
  return axios.put(`${API_URL}/categories/`, table, { headers: authHeader() })
  .then (response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};
