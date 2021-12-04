import axios from "axios";
import authHeader from "./authHeader";
import { API_URL } from "./config";

export const getVariationList = () => {
  return axios
    .get(`${API_URL}/variations/`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const getMostUsedVariationsList = (userId) => {
  return axios
    .get(`${API_URL}/variations/mostUsed/${userId}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const getVariationByProduct = (productId) => {
  return axios
    .get(`${API_URL}/variations/${productId}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const getVariation = (id) => {
  return axios
    .get(`${API_URL}/variation/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const createVariation = (userId, variation) => {
  return axios
    .post(`${API_URL}/variation/create/${userId}`, variation, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const removeVariation = (userId, variationId) => {
  return axios
    .delete(`${API_URL}/variation/${variationId}/${userId}`, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const updateVariation = (userId, variation) => {
  return axios
    .put(`${API_URL}/variation/${variation.id}/${userId}`, variation, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const checkIsVariationAvailable = (userId, variationId) => {
  return axios
    .get(`${API_URL}/varation/isAvailable/${variationId}/${userId}`, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};

export const updateStorage = (userId, variations, type) => {
  if (type === "estoque") {
    return axios
      .post(
        `${API_URL}/variation/updateStorageLocalization/${userId}`,
        variations,
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        return { error: err };
      });
  } else if (type === "bazar") {
    return axios
      .post(`${API_URL}/variation/updateStorageBazar/${userId}`, variations, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        return { error: err };
      });
  }
};
