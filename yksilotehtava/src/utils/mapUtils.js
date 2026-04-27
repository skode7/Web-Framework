import * as L from 'https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js';

let mapInstance = null;
let restaurantMarkers = [];
let userMarker = null;

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Initializes a new Leaflet map instance in the specified container.
 * Removes any existing map instance first.
 * @param {string} [containerId='map'] - The ID of the HTML element to contain the map.
 * @returns {Object} The initialized Leaflet map instance.
 */
export const initMap = (containerId = 'map') => {
  if (mapInstance !== null) {
    mapInstance.remove();
    mapInstance = null;
  }
  mapInstance = L.map(containerId).setView([60.1699, 24.9384], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(mapInstance);

  return mapInstance;
};

/**
 * Adds markers for restaurants to the map with popups showing name and address.
 * @param {Object[]} restaurants - Array of restaurant objects with location data.
 * @param {Object} map - The Leaflet map instance to add markers to.
 */
export const addRestaurantMarkers = (restaurants, map) => {
  restaurants.forEach((restaurant) => {
    const lat = restaurant.location.coordinates[1];
    const lon = restaurant.location.coordinates[0];
    if (restaurant.location && lat && lon) {
      const marker = L.marker([lat, lon]).addTo(map).bindPopup(`
          <strong>${restaurant.name}</strong><br>
          ${restaurant.address || ''}
        `);
      restaurantMarkers.push({marker, restaurant});
    }
  });
};
/**
 * Shows the user's location on the map with a red marker and centers the view.
 * @param {Object} map - The Leaflet map instance.
 * @param {number} lat - User's latitude.
 * @param {number} lon - User's longitude.
 */
export const showUserLocation = (map, lat, lon) => {
  if (userMarker) {
    map.removeLayer(userMarker);
  }
  const redIcon = L.icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  userMarker = L.marker([lat, lon], {icon: redIcon})
    .addTo(map)
    .bindPopup('Sijaintisi')
    .openPopup();

  map.setView([lat, lon], 14);
};

/**
 * Adds distance property to each restaurant based on user's current location.
 * @param {Object[]} restaurants - Array of restaurant objects.
 * @returns {Promise<Object[]>} Restaurants with added distance property.
 */
export const addDistanceToRestaurants = async (restaurants) => {
  const {lat, lon} = await getUserPosition();

  return restaurants.map((restaurant) => {
    const distance = calculateDistance(
      Number(lat),
      Number(lon),
      Number(restaurant.location.coordinates[1]),
      Number(restaurant.location.coordinates[0])
    );
    return {...restaurant, distance};
  });
};

/**
 * Finds the 5 nearest restaurants to the user's location.
 * @param {Object[]} restaurants - Array of restaurant objects.
 * @param {number} userLat - User's latitude.
 * @param {number} userLon - User's longitude.
 * @returns {Object[]} Array of the 5 nearest restaurants with distance property.
 */
export const findNearestRestaurants = (restaurants, userLat, userLon) => {
  return restaurants
    .filter(
      (r) =>
        r.location && r.location.coordinates[1] && r.location.coordinates[0]
    )
    .map((restaurant) => {
      const distance = calculateDistance(
        Number(userLat),
        Number(userLon),
        Number(restaurant.location.coordinates[1]),
        Number(restaurant.location.coordinates[0])
      );
      return {...restaurant, distance};
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5);
};

/**
 * Focuses the map view on a specific restaurant and opens its popup.
 * @param {Object} map - The Leaflet map instance.
 * @param {Object[]} restaurantMarkers - Array of marker objects with restaurant data.
 * @param {number} lat - Restaurant latitude.
 * @param {number} lon - Restaurant longitude.
 */
export const focusOnRestaurant = (map, restaurantMarkers, lat, lon) => {
  map.setView([lat, lon], 16);
  restaurantMarkers.forEach(({marker, restaurant}) => {
    if (
      Math.abs(restaurant.location.lat - lat) < 0.001 &&
      Math.abs(restaurant.location.lon - lon) < 0.001
    ) {
      marker.openPopup();
    }
  });
};

/**
 * Gets the user's current geolocation or returns default coordinates.
 * @returns {Promise<{lat: number, lon: number}>} User's position coordinates.
 */
export const getUserPosition = () => {
  const DEFAULT_LOCATION = {lat: 60.1699, lon: 24.9384};

  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(DEFAULT_LOCATION);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.warn(
          'Sijainnin haku kielletty tai epäonnistui:',
          error.message
        );
        resolve(DEFAULT_LOCATION);
      }
    );
  });
};

/**
 * Shows markers for the nearest restaurants on the map.
 * @param {Object} map - The Leaflet map instance.
 * @param {Object[]} restaurants - Array of restaurant objects to display.
 */
export const showNearestRestaurants = (map, restaurants) => {
  restaurants.forEach((res) => {
    if (res.location && res.location.lat && res.location.lon) {
      const m = L.marker([res.location.lat, res.location.lon])
        .addTo(map)
        .bindPopup(`<b>${res.name}</b><br>${res.address}`);

      restaurantMarkers.push(m);
    }
  });
};

/**
 * Handles displaying the nearest restaurants on the map, including user location.
 * @param {Object[]} restaurants - Array of all restaurant objects.
 */
export const handleNearestRestaurants = async (restaurants) => {
  try {
    const userCoords = await getUserPosition();
    const map = getMap();

    if (!map) {
      return;
    }

    showUserLocation(map, userCoords.lat, userCoords.lon);

    const nearest = findNearestRestaurants(
      restaurants,
      userCoords.lat,
      userCoords.lon
    );

    const zoomGroup = L.featureGroup([
      L.marker([userCoords.lat, userCoords.lon]), // Käyttäjä mukaan
      ...nearest.map((r) =>
        L.marker([r.location.coordinates[1], r.location.coordinates[0]])
      ),
    ]);

    map.fitBounds(zoomGroup.getBounds().pad(0.2));
  } catch {
    //
  }
};

/**
 * Initializes a modal map for a specific restaurant.
 * @param {Object} res - Restaurant object with location data.
 */
export const initModalMap = (res) => {
  const lat = res.location.coordinates[1];
  const lon = res.location.coordinates[0];

  setTimeout(() => {
    const modalMap = L.map('modal-map', {
      zoomControl: false, // Pidetään simppelinä
      attributionControl: false, // Ei turhaa tekstiä pieneen tilaan
    }).setView([lat, lon], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
      modalMap
    );

    L.marker([lat, lon]).addTo(modalMap);

    modalMap.invalidateSize();
  }, 100);
};
/**
 * Returns the current map instance.
 * @returns {Object|null} The Leaflet map instance or null if not initialized.
 */
export const getMap = () => mapInstance;
