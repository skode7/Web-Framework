const tempInCelsius = parseFloat(prompt('Enter temperature in celsius: '));

function convert(temp) {
  const tempInFahrenheit = (tempInCelsius * 9) / 5 + 32;
  const tempInKelvin = tempInCelsius + 273.15;

  console.log('Temp in fahrenheit: ' + tempInFahrenheit);
  console.log('Temp in kelvin: ' + tempInKelvin);
}

convert(tempInCelsius);
