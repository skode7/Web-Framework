// Haetaan suosikit localStoragesta
export const getFavorites = () => {
  const favs = localStorage.getItem('favorites');
  return favs ? JSON.parse(favs) : [];
};

// Lisätään tai poistetaan suosikki
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
