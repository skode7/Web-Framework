import {fetchData} from './apiClient.js';
import {CHECK_USERNAME_AVAILABILITY, LOGIN, USER} from '../config/config.js';

/**
 * Logs in a user with the provided credentials.
 * Stores the authentication token in localStorage if login is successful.
 * @param {Object} values - Login credentials (username and password).
 * @returns {Promise<Object>} Login result containing token or error information.
 */
export const login = async (values) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  };

  const result = await fetchData(LOGIN, options);
  if (result?.token) {
    window.localStorage.setItem('token', result?.token);
  }
  return result;
};

/**
 * Checks if a username is available for registration.
 * @param {string} username - The username to check.
 * @returns {Promise<Object>} Availability result with 'available' boolean property.
 */
export const checkUsernameAvailability = async (username) => {
  try {
    return await fetchData(`${CHECK_USERNAME_AVAILABILITY}/${username}`);
  } catch (error) {
    console.warn({error: error});
  }
};

/**
 * Creates a new user account if the username is available.
 * @param {Object} values - User registration data (username, password, etc.).
 * @returns {Promise<Object|undefined>} User creation result or undefined if username taken or error.
 */
export const createUser = async (values) => {
  const {username} = values;
  const {available} = await checkUsernameAvailability(username);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  };

  try {
    if (available) {
      return await fetchData(`${USER}`, options);
    } else {
      alert('Käyttäjänimi varattu!');
    }
  } catch (error) {
    console.warn({error: error});
  }
};
