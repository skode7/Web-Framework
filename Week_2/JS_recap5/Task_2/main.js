const apiKey =
  'pub_eab81beecc818542ce388ad5fd9295604e2867507ee39cc0c17fd858737ade68';
const url = 'https://reqres.in/api/users';

async function getData() {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
    },
    body: JSON.stringify({
      email: 'Matti',
      job: 'Java Developer',
    }),
  });

  const result = await response.json();
  console.log(result);
}

getData();
