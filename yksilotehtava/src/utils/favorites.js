/**
 * Retrieves the list of favorite restaurant IDs from localStorage.
 * @returns {string[]} Array of favorite restaurant IDs.
 */
export const getFavorites = () => {
  const favs = localStorage.getItem('favorites');
  return favs ? JSON.parse(favs) : [];
};

/**
 * Toggles a restaurant ID in the favorites list.
 * If the ID is already in favorites, it is removed; otherwise, it is added.
 * @param {string} restaurantId - The ID of the restaurant to toggle.
 * @returns {string[]} Updated array of favorite restaurant IDs.
 */
export const toggleFavorite = (restaurantId) => {
  let favs = getFavorites();
  if (favs.includes(restaurantId)) {
    favs = favs.filter((id) => id !== restaurantId); // Poista
  } else {
    favs.push(restaurantId); // Lisää
  }
  localStorage.setItem('favorites', JSON.stringify(favs));
  return favs;
};
