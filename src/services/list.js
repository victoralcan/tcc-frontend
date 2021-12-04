import axios from 'axios';
import authHeader from './authHeader';
import { API_URL } from './config';

export const getAllList = () => {
  return axios.get(`${API_URL}/lists/`)
  .then( response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const getList = ( id ) => {
  return axios.get(`${API_URL}/list/${id}`)
  .then( response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const createList = (userId, list) => {
  return axios.post(`${API_URL}/list/create/${userId}`, list, { headers: authHeader() })
  .then( response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const removeList = (userId, listId) => {
  return axios.delete(`${API_URL}/list/${listId}/${userId}`, { headers: authHeader() })
  .then (response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const updateList = (userId, list) => {
  return axios.put(`${API_URL}/list/${list.id}/${userId}`, list, { headers: authHeader() })
  .then (response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};