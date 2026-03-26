// Näyttää ravintolat käyttäjälle
// Lisää tarvittavat kuuntelijat ja niiden toiminnallisuudet

import {restaurantRow, restaurantModal} from './components.js';

async function showRestaurants() {
  const dialog = document.querySelector('dialog');
  const table = document.querySelector('table');
  const restaurants = await getRestaurantData();

  restaurants.sort((r1, r2) => {
    return r1.name.localeCompare(r2.name);
  });

  for (const restaurant of restaurants) {
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

    table.appendChild(row);
  }
}

// Show details and menu when user click's restaurant row
async function addDialogFunctionality(clickedRestaurant, dialog) {
  const menu = await getDailyMenuByRestaurantID(clickedRestaurant._id);
  const div = restaurantModal(clickedRestaurant, menu);

  dialog.append(div);
  dialog.showModal();
  dialog.addEventListener('click', (event) => {
    dialog.innerHTML = '';
    dialog.close();
  });

  dialog.showModal();
  dialog.addEventListener('click', (event) => {
    dialog.innerHTML = '';
    dialog.close();
  });
}

// Palauttaa parametrina annettua ID:ta vastaavan restaurant olion
function getRestaurantById(restaurants, id) {
  const index = restaurants.findIndex((restaurant) => {
    return restaurant._id === id;
  });
  return restaurants[index];
}

// Haetaan ravintolat API:sta
async function getRestaurantData() {
  const url = 'https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants';
  try {
    const response = await fetch(url);

    if (response.ok) {
      return await response.json();
    }
    console.log('Invalid response!', response.status);
  } catch (error) {
    console.log('error in getRestaurantData:', error.message);
  }
}

// Palauttaa parametrina annettua id:ta vastaavan ravintolan menun
async function getDailyMenuByRestaurantID(restaurantId) {
  const lang = 'fi';
  const url = `https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/daily/${restaurantId}/${lang}`;

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

showRestaurants();
