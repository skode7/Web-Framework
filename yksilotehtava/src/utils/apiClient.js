import {BASE_URL, GET_RESTAURANTS} from '../config/config.js';

/**
 * Fetches the list of restaurants from the API.
 * @returns {Promise<Object[]|undefined>} Array of restaurant objects or undefined if error occurs.
 */
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

/**
 * Fetches data from the specified API endpoint with optional configuration.
 * @param {string} endPoint - The API endpoint to fetch from (relative to BASE_URL).
 * @param {Object} [options={}] - Additional fetch options to merge with defaults.
 * @returns {Promise<Object|undefined>} The JSON response data or undefined if error occurs.
 */
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
