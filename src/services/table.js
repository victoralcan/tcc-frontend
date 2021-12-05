import axios from 'axios';
import authHeader from './authHeader';
import { API_URL } from './config';

export const getTableList = () => {
  return axios.get(`${API_URL}/tables/`,{ headers: authHeader() })
  .then( response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const getTable = ( id ) => {
  return axios.get(`${API_URL}/tables/${id}`,{ headers: authHeader() })
  .then( response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const createTable = (table) => {
  return axios.post(`${API_URL}/tables/`, table, { headers: authHeader() })
  .then( response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const removeTable = (tableId) => {
  return axios.delete(`${API_URL}/tables/${tableId}`, { headers: authHeader() })
  .then (response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const updateTable = (table) => {
  return axios.put(`${API_URL}/tables/`, table, { headers: authHeader() })
  .then (response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};
