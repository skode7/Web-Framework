import {fetchData, getRestaurants} from './utils/apiClient.js';
import changePage from './utils/changePage.js';
import {
  addRestaurantMarkers,
  initMap,
  handleNearestRestaurants,
  addDistanceToRestaurants,
} from './utils/mapUtils.js';
import {createUser, login} from './utils/loginUtils.js';
import {
  createRestaurantCard,
  showRestaurantInGrid,
} from './components/components.js';
import {getFavorites} from './utils/favorites.js';
import {BASE_URL, UPLOAD_AVATAR, USER} from './config/config.js';

const main = async () => {
  const navLinks = document.querySelectorAll('.bar');
  const restaurants = await getRestaurants();
  const showNearestBtn = document.querySelector('#show-nearest-btn');
  const restaurantsWithDistance = await addDistanceToRestaurants(restaurants);
  const grid = document.querySelector('.restaurant-grid');
  const cityFilter = document.querySelector('#city-filter');
  const companyFilter = document.querySelector('#company-filter');
  const searchInput = document.querySelector('#restaurant-search');
  const heroFeatures = document.querySelectorAll('.feature');
  const onlyFavsCheckbox = document.querySelector('#only-favorites');
  const favIds = getFavorites();
  const loginForm = document.querySelector('#login-form');
  const regForm = document.querySelector('#register-form');
  const token = localStorage.getItem('token');
  const browseBtn = document.querySelector('#start-browsing');

  restaurantsWithDistance.forEach((restaurant) => {
    showRestaurantInGrid(createRestaurantCard(restaurant));
  });

  showNearestBtn.addEventListener('click', async () => {
    await handleNearestRestaurants(restaurants);
  });

  const handleFiltering = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const cityValue = cityFilter.value;
    const companyValue = companyFilter.value;

    const filtered = restaurantsWithDistance.filter((res) => {
      const matchesSearch =
        res.name.toLowerCase().includes(searchTerm) ||
        res.address.toLowerCase().includes(searchTerm);
      const matchesCity = cityValue === 'all' || res.city === cityValue;
      const matchesCompany =
        companyValue === 'all' || res.company === companyValue;
      const matchesFav = !onlyFavsCheckbox.checked || favIds.includes(res._id);

      return matchesSearch && matchesCity && matchesCompany && matchesFav;
    });

    grid.innerHTML = '';
    if (filtered.length === 0) {
      grid.innerHTML =
        '<p class="info-text">Ei hakuehtoja vastaavia ravintoloita.</p>';
      return;
    }

    const nearestInFiltered = [...filtered].sort(
      (a, b) => a.distance - b.distance
    )[0];

    filtered.forEach((res) => {
      const isNearest = res === nearestInFiltered;
      grid.append(createRestaurantCard(res, isNearest));
    });
  };

  const clearFilters = () => {
    if (searchInput) searchInput.value = '';
    if (cityFilter) cityFilter.value = 'all';
    if (companyFilter) companyFilter.value = 'all';
    if (onlyFavsCheckbox.checked) onlyFavsCheckbox.checked = false;
    handleFiltering();
  };

  searchInput.addEventListener('input', handleFiltering);
  cityFilter.addEventListener('change', handleFiltering);
  companyFilter.addEventListener('change', handleFiltering);
  onlyFavsCheckbox.addEventListener('change', handleFiltering);
  let mapInitialized = false;

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('href').substring(1);
      changePage(id);
      clearFilters();

      if (id === 'find-nearest' && !mapInitialized) {
        const map = initMap();
        addRestaurantMarkers(restaurantsWithDistance, map);
        mapInitialized = true;
      }
    });
  });

  heroFeatures.forEach((feature) => {
    feature.addEventListener('click', () => {
      const text = feature.querySelector('p').textContent;

      if (text === 'Lähimmät') {
        document.querySelector('a[href="#find-nearest"]').click();
      } else if (text === 'Menut') {
        document.querySelector('a[href="#restaurants"]').click();
      } else if (text === 'Suosikit') {
        document.querySelector('a[href="#restaurants"]').click();
        const favCheckbox = document.querySelector('#only-favorites');
        if (favCheckbox) {
          favCheckbox.checked = true;
          handleFiltering();
        }
      }
    });
  });

  const initAuthUI = () => {
    const loginTab = document.querySelector('#tab-login');
    const regTab = document.querySelector('#tab-register');

    loginForm.classList.remove('hidden');
    regForm.classList.add('hidden');
    loginTab.classList.add('active');
    regTab.classList.remove('active');

    loginTab.addEventListener('click', (e) => {
      e.preventDefault();
      loginForm.classList.remove('hidden');
      regForm.classList.add('hidden');
      loginTab.classList.add('active');
      regTab.classList.remove('active');
    });

    regTab.addEventListener('click', (e) => {
      e.preventDefault();
      regForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
      regTab.classList.add('active');
      loginTab.classList.remove('active');
    });
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    const isLogin = form.id === 'login-form';

    try {
      if (isLogin) {
        const loginResult = await login(values);
        if (loginResult && loginResult.token) {
          localStorage.setItem('token', loginResult.token);
          e.target.reset();
          changePage('profile');
          await loadProfileData();
          updateNavigation();
        } else {
          alert(
            'Kirjautuminen epäonnistui: ' +
              (loginResult.message || 'Tarkista tunnus')
          );
        }
      } else {
        const registerResult = await createUser(values);
        if (registerResult?.data) {
          alert(
            `Tervetuloa ${registerResult.data.username}! Tili on luotu onnistuneesti.`
          );
          e.target.reset();
          document.getElementById('tab-login-btn').click();
        }
      }
    } catch {
      //
    }
  };

  loginForm.addEventListener('submit', (e) => {
    handleAuthSubmit(e);
  });
  regForm.addEventListener('submit', (e) => {
    handleAuthSubmit(e);
  });

  if (browseBtn) {
    browseBtn.addEventListener('click', (e) => {
      e.preventDefault();

      changePage('restaurants');

      const restaurantNavLink = document.querySelector(
        'a[href="#restaurants"]'
      );
      if (restaurantNavLink) {
        restaurantNavLink.click();
      }
    });
  }

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const options = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const result = await fetchData(USER, options);
      if (result) {
        alert('Tiedot päivitetty!');
        await loadProfileData();
      }
    } catch {
      alert('Tietojen päivitys epäonnistui.');
    }
  };
  async function loadProfileData() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const userData = await fetchData(`${USER}/token`, {
        headers: {Authorization: `Bearer ${token}`},
      });

      if (userData) {
        document.getElementById('update-username').value = userData.username;
        document.getElementById('update-email').value = userData.email;
        if (userData.avatar) {
          const fullImageUrl = `${BASE_URL}/uploads/${userData.avatar}`;
          document.getElementById('profile-img-preview').src = fullImageUrl;
        }
      }
    } catch {
      //
    }
  }

  const handleAvatarSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const fileInput = document.getElementById('avatar-input');

    if (fileInput.files.length === 0) {
      alert('Valitse ensin kuva!');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', fileInput.files[0]);

    try {
      const response = await fetchData(UPLOAD_AVATAR, {
        method: 'POST',
        headers: {Authorization: `Bearer ${token}`},
        body: formData,
      });
      alert('Kuva päivitetty!');
      const newFilename = response.data.avatar;
      const fullUrl = `${BASE_URL}/uploads/${newFilename}`;
      document.getElementById('profile-img-preview').src = fullUrl;
    } catch {
      //
    }
  };

  const updateForm = document.querySelector('#update-user-form');
  if (updateForm) {
    updateForm.addEventListener('submit', handleUpdateUser);
  }

  const avatarForm = document.querySelector('#avatar-form');
  if (avatarForm) {
    avatarForm.addEventListener('submit', handleAvatarSubmit);
  }

  function updateNavigation() {
    const token = localStorage.getItem('token');
    const loginLink = document.querySelector('a[href="#login"]');

    if (token) {
      if (loginLink) {
        loginLink.textContent = 'Profiili';
        loginLink.setAttribute('href', '#profile');

        loginLink.addEventListener('click', async (e) => {
          e.preventDefault();
          changePage('profile');
          await loadProfileData();
        });
      }

      const logoutBtn = document.querySelector('#logout-btn');
      if (logoutBtn) {
        logoutBtn.classList.remove('hidden');
        logoutBtn.addEventListener('click', () => {
          localStorage.removeItem('token');
          location.reload();
        });
      }
    } else {
      if (loginLink) {
        loginLink.textContent = 'Kirjaudu';
        loginLink.setAttribute('href', '#login');
        loginLink.onclick = null;
      }
    }
  }
  if (token) {
    try {
      await loadProfileData();

      updateNavigation();
    } catch {
      localStorage.removeItem('token');
      updateNavigation();
    }
  } else {
    updateNavigation();
  }
  initAuthUI();
};

main();
