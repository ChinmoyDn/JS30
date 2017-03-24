const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
  .then(data => data.json())
  .then(citiesArr => cities.push(...citiesArr));

function findCities(cityToFind, cities) {
  return cities.filter(city =>{
    const regex = new RegExp(cityToFind, 'gi');
    return city.city.match(regex) || city.state.match(regex);
  })
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const cityInput = document.querySelector('.search');
const cityList = document.querySelector('.suggestions');

function displayCities(){
  const cityInputVal = this.value;
  if(!cityInputVal){
    cityList.innerHTML = "";
    return;
  }
  const citiesToDisplay = findCities(cityInputVal, cities);
  const regex = new RegExp(cityInputVal, 'gi');
  const cityListStr = citiesToDisplay.map(cityObj => {
    const cityName = cityObj.city.replace(regex, 
      `<span class="hl">${cityInputVal}</span> `); 
    const stateName = cityObj.state.replace(regex, 
      `<span class="hl">${cityInputVal}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(cityObj.population)}</span>
      </li>
    `;
  }).join();
  cityList.innerHTML = cityListStr;
}



cityInput.addEventListener('change', displayCities);
cityInput.addEventListener('keyup', displayCities);
