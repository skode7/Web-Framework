const apiKey =
  'pub_eab81beecc818542ce388ad5fd9295604e2867507ee39cc0c17fd858737ade68';
const url = 'https://reqres.in/api/unknown/23';

async function getData() {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
      },
    });

    if (!response.ok) {
      console.log('error', response.status);
    } else {
      console.log(await response.json());
    }
  } catch (error) {
    console.log('Error: ', error.message);
  }
}

getData();
