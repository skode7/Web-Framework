const showRestaurant = (restaurant) => {};

const getRestaurantCard = (restaurant) => {
  return `
  <article class="restaurant-card">
    <h3>${restaurant.name}</h3>
    <p>${restaurant.address} ${restaurant.city}</p>
    <p> ${restaurant.phone}</p
  </article>
`;
};

export {showRestaurant, getRestaurantCard};
