import {getRestaurants} from './utils/apiClient.js';
import {createRestaurantCard} from './components/components.js';

const showRestaurants = async () => {
  const data = await getRestaurants();
};

const testing = async () => {
  const data = await getRestaurants();
  const restaurantSection = document.querySelector('.restaurant-grid');

  if (data.length < 1) {
    restaurantSection.innerHTML = '<h2>Please try again</h2>';
  }

  data.forEach((restaurant) => {
    restaurantSection.append(createRestaurantCard(restaurant));
  });
};

testing();
