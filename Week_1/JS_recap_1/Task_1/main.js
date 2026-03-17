const tempInCelsius = parseFloat(prompt('Enter temperature in celsius: '));

function convert(temp) {
  const tempInFahrenheit = (tempInCelsius * 9) / 5 + 32;
  const tempInKelvin = tempInCelsius + 273.15;
  const resultString = `
    ${tempInCelsius} celsius in fahrenheit is: ${tempInFahrenheit}
    ${tempInCelsius} celsius in kelvin is: ${tempInKelvin}`;

  document.querySelector('p').innerText = resultString;
}

convert(tempInCelsius);
