import {baseUrl} from './variables.js';

// Haetaan ravintolat API:sta
async function fetchData() {
  const url = baseUrl + '/api/v1/restaurants';
  try {
    const response = await fetch(url);

    if (response.ok) {
      return await response.json();
    }
    console.log('Invalid response!', response.status);
  } catch (error) {
    console.log('error in fetchData:', error.message);
  }
}

// Palauttaa parametrina annettua ID:ta vastaavan restaurant olion
function getRestaurantById(restaurants, id) {
  const index = restaurants.findIndex((restaurant) => {
    return restaurant._id === id;
  });
  return restaurants[index];
}

// Palauttaa parametrina annettua id:ta vastaavan ravintolan menun
async function getDailyMenuByRestaurantID(restaurantId) {
  const lang = 'fi';
  const url = `${baseUrl}/api/v1/restaurants/daily/${restaurantId}/${lang}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      console.log('response ok!');
      return await response.json();
    }
    console.log('invalid response', response.status);
  } catch (error) {
    console.log('Error in getDailyMenuByRestaurantId', error.message);
  }
}

export {fetchData, getRestaurantById, getDailyMenuByRestaurantID};
