import {initModalMap} from '../utils/mapUtils.js';
import {fetchData} from '../utils/apiClient.js';
import {getFavorites, toggleFavorite} from '../utils/favorites.js';
import {GET_DAILY_MENU} from '../config/config.js';

const ICONS = {
  LOCATION:
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
  PHONE:
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
  DISTANCE:
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>',
};

const openRestaurantModal = async (res) => {
  const {_id} = res;
  const dialog = document.querySelector('.restaurant-dialog');
  let dailyMenu;

  try {
    dailyMenu = await fetchData(`${GET_DAILY_MENU}${_id}/fi`);
  } catch {
    //
  }

  dialog.innerHTML = `
    <div class="modal-container">
      <header class="modal-header">
        <div>
          <h2>${res.name}</h2>
          <p class="company-tag">${res.company}</p>
        </div>
        <button class="close-btn" aria-label="Sulje">×</button>
      </header>

      <div class="modal-info-top">
          <p>${ICONS.LOCATION} ${res.address}, ${res.city}</p>
          ${res.distance ? `<p>${ICONS.DISTANCE} ${res.distance.toFixed(1)} km</p>` : ''}
      </div>

      <div class="modal-body">
        <div id="modal-map" style="height: 150px; width: 100%; border-radius: 10px; margin-bottom: 15px;"></div>

        <div class="menu-section">
          <h3 id="menu-title">Päivän ruokalista</h3>
          <div id="menu-container">
             ${renderMenu(dailyMenu?.courses)}
          </div>
        </div>

        <div class="modal-actions">
          <button class="cta-button" id="toggle-menu">Viikon lista</button>
        </div>
      </div>
    </div>
  `;

  dialog.showModal();
  initModalMap(res);

  const menuContainer = dialog.querySelector('#menu-container');
  const menuTitle = dialog.querySelector('#menu-title');
  const toggleBtn = dialog.querySelector('#toggle-menu');
  let isWeekly = false;

  toggleBtn.onclick = async () => {
    isWeekly = !isWeekly;

    if (isWeekly) {
      menuContainer.innerHTML =
        '<p class="loading-text">Ladataan viikon listaa...</p>';
      toggleBtn.textContent = 'Päivän lista';
      menuTitle.textContent = 'Viikon ruokalista';

      try {
        const weeklyData = await fetchData(
          `api/v1/restaurants/weekly/${_id}/fi`
        );
        renderWeeklyMenu(weeklyData?.days, menuContainer);
      } catch {
        //
      }
    } else {
      toggleBtn.textContent = 'Viikon lista';
      menuTitle.textContent = 'Päivän ruokalista';
      renderMenu(dailyMenu?.courses, menuContainer);
    }
  };

  const close = () => dialog.close();
  dialog.querySelector('.close-btn').onclick = close;
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) close();
  });
};

const renderMenu = (courses, container = null) => {
  if (!courses || courses.length === 0)
    return '<p>Ei ruokalistaa saatavilla.</p>';

  const html = `
    <ul class="menu-list">
      ${courses
        .map(
          (c) => `
        <li>
          <div class="course-row">
            <span class="course-name">${c.name}</span>
            <span class="course-diet">${c.diets || ''}</span>
          </div>
          <small>${c.price || ''}</small>
        </li>
      `
        )
        .join('')}
    </ul>
  `;

  if (container) container.innerHTML = html;
  return html;
};

const renderWeeklyMenu = (days, container) => {
  if (!days || days.length === 0) {
    container.innerHTML = '<p>Viikon listaa ei löytynyt.</p>';
    return;
  }

  container.innerHTML = days
    .map(
      (day) => `
    <div class="weekly-day">
      <h4>${day.date}</h4>
      ${renderMenu(day.courses)}
    </div>
  `
    )
    .join('');
};

const createRestaurantCard = (res, isNearest) => {
  const isFav = getFavorites().includes(res._id);
  const card = document.createElement('article');
  card.className = `restaurant-card ${isNearest ? 'is-nearest' : ''} ${isFav ? 'is-favorite' : ''}`;

  const distanceTag = res.distance
    ? `<span class="dist-badge">${res.distance.toFixed(1)} km</span>`
    : '';

  const phoneRow = res.phone
    ? `<div class="info-row">
       <span class="icon">${ICONS.PHONE}</span>
       <a href="tel:${res.phone}" class="text">${res.phone}</a>
     </div>`
    : '';

  card.innerHTML = `
    <div class="card-header">
    <button class="fav-btn" data-id="${res._id}" aria-label="Lisää suosikkeihin">
      <svg class="heart-icon" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </button>
      <h3 class="title-group">${res.name}</h3>
      ${distanceTag}
      ${isNearest ? '<span class="nearest-badge">Lähin sinua</span>' : ''}
    </div>
    <div class="card-content">
      <div class="info-row">
        <span class="icon">${ICONS.LOCATION}</span>
        <span class="text">${res.address}, ${res.city}</span>
      </div>
      ${phoneRow}
    </div>
  `;
  const favBtn = card.querySelector('.fav-btn');

  favBtn.onclick = (e) => {
    e.stopPropagation(); // Estää modaalin aukeamisen
    const newFavs = toggleFavorite(res._id);
    const active = newFavs.includes(res._id);

    // Päivitetään ikonin täyttö ja kortin luokka lennosta
    favBtn
      .querySelector('svg')
      .setAttribute('fill', active ? 'currentColor' : 'none');
    card.classList.toggle('is-favorite', active);
  };

  card.addEventListener('click', () => openRestaurantModal(res));
  return card;
};

const showRestaurantInGrid = async (restaurant) => {
  const restaurantSection = document.querySelector('.restaurant-grid');

  if (!restaurant) {
    restaurantSection.innerHTML = '<h2>Please try again</h2>';
  }

  restaurantSection.append(restaurant);
};
export {createRestaurantCard, showRestaurantInGrid};
