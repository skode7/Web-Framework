const numbers = [];

function handleArray(numbers) {
  for (let i = 0; i < 5; i++) {
    num = parseInt(prompt(`enter number ${i + 1}:`));
    numbers.push(num);
  }
  console.log('Numbers: ' + numbers);

  const numberToSearch = parseInt(prompt('Enter number to search: '));

  if (numbers.includes(numberToSearch)) {
    console.log('Number ' + numberToSearch + ' is found in the array');
  } else {
    console.log(numberToSearch + ' not found!');
  }

  numbers.pop();

  console.log('Updated numbers: ' + numbers);

  console.log('Sorted numbers: ' + numbers.sort((a, b) => a - b));
}

handleArray(numbers);
