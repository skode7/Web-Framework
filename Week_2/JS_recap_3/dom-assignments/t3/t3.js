const myDiv = document.querySelector('#target');

const nameAndVersionAndOs = navigator.userAgent;
const width = window.screen.width;
const height = window.screen.height;
const screenSpace = window.innerWidth + 'x' + window.innerHeight;
const currentDate = new Date().toLocaleDateString('fi-FI');
const currentTime = new Date().toLocaleTimeString('fi-FI');

myDiv.innerHTML = `
<p>Name, version and OS: ${nameAndVersionAndOs}</p>
<p>width: ${width}</p>
<p>height: ${height}</p>
<p>screen space: ${screenSpace}</p>
<p>current date: ${currentDate}</p>
<p>current time: ${currentTime}</p>`;
