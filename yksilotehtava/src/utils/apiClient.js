import {BASE_URL as baseURL} from '../config/config.js';

export const getRestaurants = async () => {
  const endPoint = '/api/v1/restaurants';
  let data;

  try {
    const response = await fetch(baseURL + endPoint);
    data = await response.json();
  } catch (error) {
    console.log('error in fetch at getRestaurants!', error);
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
    console.log(`${baseURL}${endPoint}`);
    const response = await fetch(`${baseURL}${endPoint}`, defaultOptions);
    return await response.json();
  } catch (error) {
    console.log('error in fetch at fetchData!', error);
  }
};
