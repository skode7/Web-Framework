let endingNumber = prompt('Enter positive integer to start: ');

function calculateAndShowSum(endingNumber) {
  endingNumber = parseInt(endingNumber);
  let sum = 0;

  for (let i = 0; i <= endingNumber; i++) {
    sum += i;
  }
  document.querySelector('p').innerText = 'Sum: ' + sum;
}

calculateAndShowSum(endingNumber);
