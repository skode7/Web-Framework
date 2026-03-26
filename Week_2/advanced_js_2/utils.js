import {baseUrl} from './variables.js';
import {restaurantRow} from './components.js';

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

// Function to
function getFilteredRestaurants(restaurants, choice) {
  let filteredRestaurants = [];
  console.log(choice.toLowerCase());
  switch (choice.toLowerCase()) {
    case 'sodexo': {
      filteredRestaurants = restaurants.filter((restaurant) => {
        return restaurant.company.toLowerCase() === choice.toLowerCase();
      });
      break;
    }
    case 'compass group': {
      filteredRestaurants = restaurants.filter((restaurant) => {
        return restaurant.company.toLowerCase() === choice.toLowerCase();
      });
      break;
    }
    default: {
      filteredRestaurants = restaurants;
    }
  }
  return filteredRestaurants;
}

function updateRestaurantTableView(restaurants, choice, tbody) {
  const filteredRestaurants = getFilteredRestaurants(restaurants, choice);
  tbody.innerHTML = '';

  filteredRestaurants.forEach((restaurant) => {
    const row = restaurantRow(restaurant);
    row.id = restaurant._id;
    row.addEventListener('click', (event) => {
      const allRows = document.querySelectorAll('tr');
      allRows.forEach((row) => {
        row.classList = '';
      });
      row.className = 'highlight';

      addDialogFunctionality(getRestaurantById(restaurants, row.id), dialog);
    });

    tbody.appendChild(row);
  });
}

export {
  fetchData,
  getRestaurantById,
  getDailyMenuByRestaurantID,
  getFilteredRestaurants,
  updateRestaurantTableView,
};
