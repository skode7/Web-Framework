import {BASE_URL, GET_RESTAURANTS} from '../config/config.js';

export const getRestaurants = async () => {
  let data;

  try {
    const response = await fetch(BASE_URL + GET_RESTAURANTS);
    data = await response.json();
  } catch {
    //
  }
  return data;
};

export const fetchData = async (endPoint, options = {}) => {
  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  try {
    const response = await fetch(`${BASE_URL}${endPoint}`, defaultOptions);
    return await response.json();
  } catch {
    //
  }
};
