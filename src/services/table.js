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

export const createTable = (cupom) => {
  return axios.post(`${API_URL}/tables/`, cupom, { headers: authHeader() })
  .then( response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const removeTable = (cupomId) => {
  return axios.delete(`${API_URL}/tables/${cupomId}`, { headers: authHeader() })
  .then (response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const updateTable = (cupom) => {
  return axios.put(`${API_URL}/tables/${cupom.id}`, cupom, { headers: authHeader() })
  .then (response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};
