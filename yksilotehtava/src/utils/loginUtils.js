import {fetchData} from './apiClient.js';
import {CHECK_USERNAME_AVAILABILITY, LOGIN, USER} from '../config/config.js';

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
    window.sessionStorage.setItem('token', result?.token);
  }
  return result;
};

export const checkUsernameAvailability = async (username) => {
  try {
    return await fetchData(`${CHECK_USERNAME_AVAILABILITY}/${username}`);
  } catch (error) {
    console.warn({error: error});
  }
};

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
