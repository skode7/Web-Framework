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

export const getUserPosition = () => {
  const DEFAULT_LOCATION = {lat: 60.1699, lon: 24.9384};

  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.log('Sijaintia ei tueta, käytetään Helsinkiä');
      resolve(DEFAULT_LOCATION);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Sijainti saatu:', position.coords);
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

export const handleNearestRestaurants = async (restaurants) => {
  try {
    const userCoords = await getUserPosition();
    const map = getMap();

    if (!map) {
      console.error('Karttaa ei ole alustettu!');
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

    console.log('Zoomattu lähimpiin, muut ravintolat säilyivät kartalla.');
  } catch (error) {
    console.error('Virhe lähimpien ravintoloiden hakemisessa:', error);
  }
};

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
export const getMap = () => mapInstance;
