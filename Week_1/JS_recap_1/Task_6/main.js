let endingNumber = prompt(
  'Enter positive integer to create a multiplication table: '
);

function showMultiplicationTable(endingNumber) {
  document.querySelector('p').innerText = 'Multiplication table:';
  endingNumber = parseInt(endingNumber);
  const table = document.querySelector('table');

  for (let i = 1; i <= endingNumber; i++) {
    const tr2 = document.createElement('tr');
    for (let j = 1; j <= endingNumber; j++) {
      const td2 = document.createElement('td');
      td2.style.width = '25px';
      td2.innerText = i * j;

      tr2.appendChild(td2);
      table.appendChild(tr2);
    }
  }
}

showMultiplicationTable(endingNumber);
5;
