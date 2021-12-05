import axios from 'axios';
import authHeader from './authHeader';
import { API_URL } from './config';

export const getRoleList = () => {
  return axios.get(`${API_URL}/roles/`,{ headers: authHeader() })
  .then( response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const getRole = ( id ) => {
  return axios.get(`${API_URL}/roles/${id}`,{ headers: authHeader() })
  .then( response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const createRole = (table) => {
  return axios.post(`${API_URL}/roles/`, table, { headers: authHeader() })
  .then( response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const removeRole = (tableId) => {
  return axios.delete(`${API_URL}/roles/${tableId}`, { headers: authHeader() })
  .then (response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const updateRole = (table) => {
  return axios.put(`${API_URL}/roles/`, table, { headers: authHeader() })
  .then (response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};
