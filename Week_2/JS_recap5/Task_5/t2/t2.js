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

      const pForName = document.createElement('p');
      const pForAddress = document.createElement('p');
      const pForPostalCode = document.createElement('p');
      const pForCity = document.createElement('p');
      const pForPhoneNumber = document.createElement('p');
      const pForCompany = document.createElement('p');
      const clickedRestaurant = getRestaurantById(restaurants, tr.id);

      pForName.textContent = clickedRestaurant.name;
      pForAddress.textContent = clickedRestaurant.address;
      pForPostalCode.textContent = clickedRestaurant.postalCode;
      pForCity.textContent = clickedRestaurant.city;
      pForPhoneNumber.textContent = clickedRestaurant.phone;
      pForCompany.textContent = clickedRestaurant.company;

      dialog.append(
        pForName,
        pForAddress,
        pForPostalCode,
        pForCity,
        pForCompany
      );
      dialog.showModal();

      dialog.addEventListener('click', (event) => {
        dialog.innerHTML = '';
        dialog.close();
      });
    });

    table.appendChild(tr);
  }
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

showRestaurants();
