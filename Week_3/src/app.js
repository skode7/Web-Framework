import express from 'express';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.get('/api/v1/cat', (req, res) => {
  res.send(
    JSON.stringify({
      cat_id: 5,
      name: 'Kissa',
      birthdate: 'Yesterday',
      weight: '0.4kg',
      owner: 'Teemu',
      image: 'https://loremflickr.com/320/240/cat',
    })
  );
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
