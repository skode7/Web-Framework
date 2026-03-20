const movies = [];
const amountOfRates = prompt('How many movies u wanna rate?: ');

for (let i = 0; i < amountOfRates; i++) {
  const title = prompt(`Title for ${i + 1}. movie: `);
  const rating = prompt(`Rating (1-5) for ${i + 1}. movie: `);

  movies.push({
    title: title,
    rating: rating,
  });
}
movies.sort((first, second) => second.rating - first.rating);
const p = document.querySelector('p');
p.innerText = 'Sorted movies:\n';

for (const movie of movies) {
  p.innerText += movie.title + ' ' + movie.rating + '\n';
}
p.innerText += '\nHighest rating: ' + movies[0].title + ' ' + movies[0].rating;
