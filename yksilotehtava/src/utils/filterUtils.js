import {createRestaurantCard} from '../components/components.js';

/**
 * Filters the list of restaurants based on search term, city, and company,
 * then updates the restaurant grid with the filtered results.
 * @param {Object[]} allRestaurants - Array of all restaurant objects to filter.
 */
export const filterRestaurants = (allRestaurants) => {
  const searchTerm = document
    .querySelector('#restaurant-search')
    .value.toLowerCase();
  const cityValue = document.querySelector('#city-filter').value;
  const companyValue = document.querySelector('#company-filter').value;

  const filtered = allRestaurants.filter((res) => {
    const matchesSearch =
      res.name.toLowerCase().includes(searchTerm) ||
      res.address.toLowerCase().includes(searchTerm);
    const matchesCity = cityValue === 'all' || res.city === cityValue;
    const matchesCompany =
      companyValue === 'all' || res.company === companyValue;

    return matchesSearch && matchesCity && matchesCompany;
  });

  const grid = document.querySelector('.restaurant-grid');
  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML =
      '<p class="info-text">Ei hakuehtoja vastaavia ravintoloita.</p>';
    return;
  }

  filtered.forEach((res) => {
    const card = createRestaurantCard(res);
    grid.append(card);
  });
};

/**
 * Clears all filter inputs by resetting search field and filter dropdowns to default values.
 */
export const clearFilters = () => {
  const searchInput = document.querySelector('#restaurant-search');
  const cityFilter = document.querySelector('#city-filter');
  const companyFilter = document.querySelector('#company-filter');

  if (searchInput) searchInput.value = '';
  if (cityFilter) cityFilter.value = 'all';
  if (companyFilter) companyFilter.value = 'all';
};
