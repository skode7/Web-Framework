async function fetchData(url, options) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Error in fetch! Status: ', response.status);
    }

    return await response.json();
  } catch (error) {
    console.log('error catched in fetchData:', error.message);
  }
}

async function testFetchData() {
  try {
    const user = {
      name: 'John Doe',
      job: 'Developer',
    };
    const apiKey =
      'pub_eab81beecc818542ce388ad5fd9295604e2867507ee39cc0c17fd858737ade68';
    const url = 'https://reqres.in/api/users';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({user}),
    };

    const userData = await fetchData(url, options);
    console.log(userData);
  } catch (error) {
    console.log('error in testFetchData', error.message);
  }
}

testFetchData();
