// Näyttää ravintolat käyttäjälle
// Lisää tarvittavat kuuntelijat ja niiden toiminnallisuudet
async function showRestaurants() {
  const dialog = document.querySelector('dialog');
  const table = document.querySelector('table');
  const restaurants = await getRestaurantData();

  restaurants.sort((r1, r2) => {
    return r1.name.localeCompare(r2.name);
  });

  for (const restaurant of restaurants) {
    const tr = document.createElement('tr');
    const tdForName = document.createElement('td');
    const tdForAddress = document.createElement('td');
    const tdForCity = document.createElement('td');
    const tdForPhone = document.createElement('td');
    const tdForCompany = document.createElement('td');

    tdForName.textContent = restaurant.name;
    tdForAddress.textContent = restaurant.address;
    tdForCity.textContent = restaurant.city;
    tdForPhone.textContent = restaurant.phone;
    tdForCompany.textContent = restaurant.company;

    tr.id = restaurant._id;
    tr.append(tdForName, tdForAddress, tdForCity, tdForPhone, tdForCompany);
    tr.addEventListener('click', (event) => {
      const allRows = document.querySelectorAll('tr');
      allRows.forEach((row) => {
        row.classList = '';
      });

      tr.className = 'highlight';

      addDialogFunctionality(getRestaurantById(restaurants, tr.id), dialog);
    });
    table.appendChild(tr);
  }
}

// Show details and menu when user click's restaurant row
async function addDialogFunctionality(clickedRestaurant, dialog) {
  const pForDetails = document.createElement('p');
  const menu = await getDailyMenuByRestaurantID(clickedRestaurant._id);
  const div = document.createElement('div');
  const divForMenu = document.createElement('div');

  if (menu) {
    console.log(menu);

    menu.courses.forEach((item) => {
      const divForMenuItem = document.createElement('div');
      divForMenuItem.className = 'menu-item';
      divForMenuItem.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.price}</p>
      <p>${item.diets}</p>
      `;

      divForMenu.append(divForMenuItem);
    });
  }

  divForMenu.className = 'menu-div';
  divForMenu.style.display = 'grid';
  divForMenu.style.gridTemplateColumns = '2fr';

  div.append(pForDetails, divForMenu);

  pForDetails.innerText = `${
    clickedRestaurant.name +
    '\n' +
    clickedRestaurant.address +
    '\n' +
    clickedRestaurant.postalCode +
    '\n' +
    clickedRestaurant.city
  }`;

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
