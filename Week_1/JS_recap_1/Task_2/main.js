const firstPoint = prompt('enter first point coordinates (x,y): ');
const secondPoint = prompt('enter second point coordinates (x,y): ');

function calculateDistance(firstPoint, secondPoint) {
  const firstPointCoordinates = firstPoint.split(',');
  const secondPointCoordinates = secondPoint.split(',');

  const firstPointX = parseFloat(firstPointCoordinates[0]);
  const firstPointY = parseFloat(firstPointCoordinates[1]);

  const secondPointX = parseFloat(secondPointCoordinates[0]);
  const secondPointY = parseFloat(secondPointCoordinates[1]);

  const distance = Math.sqrt(
    (secondPointX - firstPointX) ** 2 + (secondPointY - firstPointY) ** 2
  );

  document.querySelector('p').innerText = `
  Distance between points ${firstPoint} and ${secondPoint}
  is ${distance}`;
}

calculateDistance(firstPoint, secondPoint);
