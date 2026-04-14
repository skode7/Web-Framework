import getRestaurants from './utils/apiClient.js';
import changePage from './utils/changePage.js';

import {
  createRestaurantCard,
  showRestaurantInGrid,
} from './components/components.js';

const main = async () => {
  const navLinks = document.querySelectorAll('.bar');
  const restaurants = await getRestaurants();

  window.addEventListener('DOMContentLoaded', () => {
    changePage('home');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('href').substring(1);
      changePage(id);
    });
  });

  restaurants.forEach((restaurant) =>
    showRestaurantInGrid(createRestaurantCard(restaurant))
  );
};

main();
