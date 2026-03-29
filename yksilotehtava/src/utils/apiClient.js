const baseURL = 'https://media2.edu.metropolia.fi/restaurant';

const getRestaurants = async () => {
  const endPoint = '/api/v1/restaurants';
  let data = [];

  try {
    const response = await fetch(baseURL + endPoint);
    data = await response.json();
  } catch (error) {
    console.log('error in fetch at getRestaurants!', error);
  }
  return data;
};

export {getRestaurants};
