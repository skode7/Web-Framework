const array = [5, 2, 8, 1, 9];
console.log('Original array: ' + array);

function sortArray(array, order) {
  let newArray = [];
  if (order === 'asc') {
    newArray = array.toSorted();
  } else {
    newArray = array.toSorted((a, b) => b - a);
  }
  return newArray;
}

console.log('Array in descending order: ', sortArray(array, 'desc'));
console.log('Array in ascending order: ', sortArray(array, 'asc'));
