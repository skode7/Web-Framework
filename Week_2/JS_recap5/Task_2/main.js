const apiKey = 'reqres_9e33be07994040529ce0adf40102f9ba';
const url = 'https://reqres.in/api/users';

async function getData() {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
    },
  });

  const result = await response.json();
  console.log(result.data);
}

getData();
