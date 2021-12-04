import axios from 'axios';
import authHeader from './authHeader';
import { API_URL } from './config';

export const getPlanList = () => {
  return axios.get(`${API_URL}/plans/`)
  .then( response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const getPlan = ( id ) => {
  return axios.get(`${API_URL}/plan/${id}`)
  .then( response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const createPlan = (userId, plan) => {
  return axios.post(`${API_URL}/plan/create/${userId}`, plan, { headers: authHeader() })
  .then( response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const removePlan = (userId, planId) => {
  return axios.delete(`${API_URL}/plan/${planId}/${userId}`, { headers: authHeader() })
  .then (response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const updatePlan = (userId, plan) => {
  return axios.put(`${API_URL}/plan/${plan.id}/${userId}`, plan, { headers: authHeader() })
  .then (response => {
    return response.data;
  })
  .catch( err => { 
    console.log(err);
    return { error: err } ;
  });
};

export const getStatusValues = (userId) => {
  return axios.get(`${API_URL}/plan/status-values/${userId}`, { headers: authHeader() })
  .then(response => {
      return response.data;
  })
  .catch(err => {
    console.log(err);
    return { error: err } ;
  });
};

export const getAdditionalServices = () => {
  return axios.get(`${API_URL}/additional-services`)
  .then(response => {
      return response.data;
  })
  .catch(err => {
    console.log(err);
    return { error: err } ;
  });
}