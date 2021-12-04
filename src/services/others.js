import axios from 'axios';

export const getZipCode = (zipCode) => {
    return axios
      .get(`https://viacep.com.br/ws/${zipCode}/json`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        return { error: err };
      });
  };