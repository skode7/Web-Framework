import {getRestaurants} from './utils/apiClient.js';
import {getRestaurantCard} from './components/components.js';

const showRestaurants = async () => {
  const data = await getRestaurants();
};

const testing = async () => {
  const data = await getRestaurants();

  const restaurantSection = document.querySelector('.restaurant-grid');

  data.forEach((restaurant) => {
    restaurantSection.innerHTML += getRestaurantCard(restaurant);
  });
};

testing();
