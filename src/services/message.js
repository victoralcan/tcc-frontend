import axios from 'axios';
import authHeader from './authHeader';
import { API_URL } from './config';

export const getMessageList = () => {
  return axios.get(`${API_URL}/messages/`)
  .then( response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const getMessage = ( id ) => {
  return axios.get(`${API_URL}/message/${id}`)
  .then( response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const createMessage = (userId, message) => {
  return axios.post(`${API_URL}/message/create/${userId}`, message, { headers: authHeader() })
  .then( response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const removeMessage = (userId, messageId) => {
  return axios.delete(`${API_URL}/message/${messageId}/${userId}`, { headers: authHeader() })
  .then (response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const updateMessage = (userId, message) => {
  return axios.put(`${API_URL}/message/${message.id}/${userId}`, message, { headers: authHeader() })
  .then (response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const getStatusValues = (userId) => {
  return axios.get(`${API_URL}/message/status-values/${userId}`, { headers: authHeader() })
  .then(response => {
      return response.data;
  })
  .catch(err => {
    console.log(err);
    return { error: err } ;
  });
};