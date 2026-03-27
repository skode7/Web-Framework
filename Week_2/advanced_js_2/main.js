// Näyttää ravintolat käyttäjälle
// Lisää tarvittavat kuuntelijat ja niiden toiminnallisuudet

import {restaurantRow, restaurantModal} from './components.js';

import {
  fetchData,
  getRestaurantById,
  updateRestaurantTableView,
  addDialogFunctionality,
} from './utils.js';

async function main() {
  const dialog = document.querySelector('dialog');
  const table = document.querySelector('table');
  const tbody = document.querySelector('table tbody');
  const restaurants = await fetchData();
  const radioChoices = document.querySelectorAll('.radio-input');
  table.append(tbody);

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

    tbody.appendChild(row);
  }

  radioChoices.forEach((choice) => {
    console.log(radioChoices);
    choice.addEventListener('change', (event) => {
      const selectedRadioChoice = document.querySelector(
        '.radio-input:checked'
      );
      updateRestaurantTableView(
        restaurants,
        selectedRadioChoice.value,
        tbody,
        dialog
      );
    });
  });
}
// Show details and menu when user click's restaurant row

main();
