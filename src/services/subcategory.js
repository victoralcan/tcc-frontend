import axios from 'axios';
import authHeader from './authHeader';
import { API_URL } from './config';

export const getSubcategoryList = () => {
  return axios.get(`${API_URL}/subcategories/`,{ headers: authHeader() })
  .then( response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const getSubcategory = ( id ) => {
  return axios.get(`${API_URL}/subcategories/${id}`,{ headers: authHeader() })
  .then( response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const createSubcategory = (table) => {
  return axios.post(`${API_URL}/subcategories/`, table, { headers: authHeader() })
  .then( response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const removeSubcategory = (tableId) => {
  return axios.delete(`${API_URL}/subcategories/${tableId}`, { headers: authHeader() })
  .then (response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const updateSubcategory = (table) => {
  return axios.put(`${API_URL}/subcategories/`, table, { headers: authHeader() })
  .then (response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};
