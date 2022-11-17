import axios from 'axios';

console.log('Script is running..');


const infoCountry = document.getElementById('info-country');
const search = document.getElementById('country-search');
search.addEventListener('submit', countrySearch);
const errorMsg = document.getElementById('error-msg');

function countrySearch(searching) {
    searching.preventDefault();
    const input = document.getElementById('input');
    fetchCountryInfo(input.value);
    input.value = '';
}

async function fetchCountryInfo(name) {
    const URI = `https://restcountries.com/v2/name/${name}`
    infoCountry.innerHTML = ``;
    errorMsg.innerHTML = ``;

    try {
        const response = await axios.get(URI);
        const country = response.data[0];
        console.log(country);

        infoCountry.innerHTML = `
        <article class="info-country-area">
        <span class="title-flag">
          <img src="${country.flag}" alt="flg" class="flag">
          <h2>${country.name}</h2>
        </span>
        <p>${country.name} is situated in ${country.region}. It has a population of ${country.population} people.</p>
        <p>The capital is ${country.capital} ${getCurrency(country.currencies)}</p>
        </article>
        `


    } catch (err) {
        console.error(err);
        errorMsg.innerHTML = `
      <p class="error-msg">${name} not found, try again</p>
        `
    }
}


function getCurrency(currency) {
    let curr = 'and you can pay with ';

    if (currency.length === 2) {
        return curr + `${currency[0].name} and ${currency[1].name}'s.`;
    }
    return curr + `${currency[0].name}'s.`;
}


//fetchCountryInfo()
