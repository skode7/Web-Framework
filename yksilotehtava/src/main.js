import getRestaurants from './utils/apiClient.js';
import changePage from './utils/changePage.js';
import {
  addRestaurantMarkers,
  showUserLocation,
  findNearestRestaurants,
  initMap,
  getUserPosition,
  getMap,
  showNearestRestaurants,
  handleNearestRestaurants,
} from './utils/mapUtils.js';

import {
  createRestaurantCard,
  showRestaurantInGrid,
} from './components/components.js';

import {
  tileLayer,
  marker,
  divIcon,
  featureGroup,
} from 'https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js';
const showMapAndMarkers = (restaurants) => {
  const map2 = initMap();
  addRestaurantMarkers(restaurants, map2);
};

const main = async () => {
  const navLinks = document.querySelectorAll('.bar');
  const restaurants = await getRestaurants();
  const showNearestBtn = document.querySelector('#show-nearest-btn');

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('href').substring(1);
      changePage(id);
      if (id === 'find-nearest') {
        showMapAndMarkers(restaurants);
      }
    });
  });

  restaurants.forEach((restaurant) =>
    showRestaurantInGrid(createRestaurantCard(restaurant))
  );

  showNearestBtn.addEventListener('click', async () => {
    await handleNearestRestaurants(restaurants);
  });
};

main();
