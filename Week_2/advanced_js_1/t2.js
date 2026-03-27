// Näyttää ravintolat käyttäjälle
// Lisää tarvittavat kuuntelijat ja niiden toiminnallisuudet

import {restaurantRow, restaurantModal} from './components.js';

import {
  fetchData,
  getRestaurantById,
  getDailyMenuByRestaurantID,
} from './utils.js';

async function main() {
  const dialog = document.querySelector('dialog');
  const table = document.querySelector('table');
  const restaurants = await fetchData();

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
main();
