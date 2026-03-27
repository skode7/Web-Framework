function restaurantRow(restaurant) {
  const {name, company} = restaurant;
  const tr = document.createElement('tr');

  tr.innerHTML = `<td>${name}</td><td>${company}</td>`;
  return tr;
}

function restaurantModal(restaurant, menu) {
  const {name, address, postalCode, city} = restaurant;
  const {courses} = menu;
  const divForMenu = document.createElement('div');
  const div = document.createElement('div');
  const pForDetails = document.createElement('p');

  pForDetails.innerText = `${
    name + '\n' + address + '\n' + postalCode + '\n' + city
  }`;

  div.append(pForDetails, divForMenu);
  divForMenu.className = 'menu-item';

  courses.forEach((item) => {
    const divForMenuItem = document.createElement('div');
    divForMenuItem.className = 'menu-item';
    divForMenuItem.innerHTML = `
  <h3>${item.name}</h3>
  <p>${item.price}</p>
  <p>${item.diets}</p>
  `;
    divForMenu.append(divForMenuItem);
  });
  return div;
}
export {restaurantRow, restaurantModal};
