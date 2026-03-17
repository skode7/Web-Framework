sideLengths = prompt('Enter side lengths of the triangle (5,3,4): ').split(',');

function determineTriangleType(sideLengths) {
  lengthOne = parseFloat(sideLengths[0]);
  lengthTwo = parseFloat(sideLengths[1]);
  lengthThree = parseFloat(sideLengths[2]);

  if (lengthOne === lengthTwo && lengthOne === lengthThree) {
    document.querySelector('p').innerText = 'Equilateral triangle';
  } else if (
    lengthOne != lengthTwo &&
    lengthOne != lengthThree &&
    lengthOne != lengthTwo &&
    lengthTwo != lengthThree
  ) {
    document.querySelector('p').innerText = 'Scalene triangle';
  } else {
    document.querySelector('p').innerText = 'Isocele triangle';
  }
}

determineTriangleType(sideLengths);
