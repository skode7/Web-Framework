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

export {showRestaurant, createRestaurantCard};
