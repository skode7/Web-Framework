const showRestaurant = (restaurant) => {};

const openRestaurantModal = (restaurant) => {
  const dialog = document.querySelector('.restaurant-dialog');
  dialog.innerText = 'test';
  dialog.showModal();
};

const createRestaurantCard = (restaurant) => {
  const article = document.createElement('article');
  article.className = 'restaurant-card';
  article.innerHTML = `
  <h3>${restaurant.name}</h3>
  <p>${restaurant.address} ${restaurant.city}</p>
  <p> ${restaurant.phone}</p
`;

  article.addEventListener('click', (event) => {
    openRestaurantModal(restaurant);
  });
  return article;
};

const showRestaurantInGrid = async (restaurant) => {
  const restaurantSection = document.querySelector('.restaurant-grid');

  if (!restaurant) {
    restaurantSection.innerHTML = '<h2>Please try again</h2>';
  }

  restaurantSection.append(restaurant);
};
export {showRestaurant, createRestaurantCard, showRestaurantInGrid};
