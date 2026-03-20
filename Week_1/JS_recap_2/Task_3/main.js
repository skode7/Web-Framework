const numbers = [];
const p = document.querySelector('p');
const evenNums = [];

while (true) {
  let number = prompt("Enter a number (or 'done' to finish):");
  if (number === 'done') {
    break;
  }
  numbers.push(number);
}

p.textContent = 'Even Numbers: ';

for (let num of numbers) {
  if (num % 2 === 0) {
    evenNums.push(num);
  }
}

evenNums.length > 0
  ? (p.textContent += evenNums.join(', '))
  : (p.textContent += 'None');
