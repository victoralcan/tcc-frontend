import axios from 'axios';
import authHeader from './authHeader';
import { API_URL } from './config';

export const getItemList = () => {
  return axios.get(`${API_URL}/items/`,{ headers: authHeader() })
  .then( response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const getItem = ( id ) => {
  return axios.get(`${API_URL}/items/${id}`,{ headers: authHeader() })
  .then( response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const createItem = (table) => {
  return axios.post(`${API_URL}/items/`, table, { headers: authHeader() })
  .then( response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const removeItem = (tableId) => {
  return axios.delete(`${API_URL}/items/${tableId}`, { headers: authHeader() })
  .then (response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const updateItem = (table) => {
  return axios.put(`${API_URL}/items/`, table, { headers: authHeader() })
  .then (response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};
