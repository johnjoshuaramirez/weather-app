import './style.css';

const input = document.querySelector('.input');
const search_button = document.querySelector('.search-button');
const loc = document.querySelector('.location');
const image = document.querySelector('.image');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const information = document.querySelector('.information');

async function getData() { 
   try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=ca895c8dee0e47768df11549232703&q=${input.value}`, { mode: 'cors' });
      const data = await response.json();
      image.src = data.current.condition.icon
      weather.innerText = data.current.condition.text;
      temperature.innerText = `${data.current.temp_c} °C`;
      loc.innerText = `${data.location.name}, ${data.location.country}`;
      information.classList.remove('hidden');
   } catch (err) {
      console.error('Error', err);
   }
}

search_button.addEventListener('click', getData);
