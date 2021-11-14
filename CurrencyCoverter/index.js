import axios from 'axios';
// const axios = require('axios');

// https://fixer.io/
const FIXER_API_KEY = 'e634966302ca14206aebff727a23f15b';
const FIXER_API = `http://data.fixer.io/api/latest?access_key=${FIXER_API_KEY}`;

// https://restcountries.eu
const REST_COUNTRIES_API = `https://restcountries.eu/rest/v2/currency`;

// fetch data about currencies
const getExchangeRate = async (fromCurrency, toCurrency) => {

  try {
      const { data: { rates } } = await axios.get(FIXER_API);
      const euro = 1 / rates[fromCurrency];
      const exchangeRate = euro * rates[toCurrency];
    
      return exchangeRate;   
  } catch (error) {
      throw new Error(`Unable to get currency ${fromCurrency} and ${toCurrency}`)
  }
};


// fetch data about countries

const getCountries = async (currencyCode) => {
  try {
      const { data } = await axios.get(`${REST_COUNTRIES_API}/${currencyCode}`);
      return data.map(({name}) => name)
  } catch (error) {
      throw new Error(`Unable to get countries that use ${currencyCode}`)
  }
};

// output Data

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    fromCurrency = fromCurrency.toUpperCase();
    toCurrency = toCurrency.toUpperCase();
    const [exchangeRate, countries] = await Promise.all([
        getExchangeRate(fromCurrency, toCurrency),
        getCountries(toCurrency),
    ])
    const convertedAmount = (amount * exchangeRate).toFixed(2);
    console.log(countries)
    console.log(exchangeRate)
    return (
        `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}.
You can spend these in the following countries: ${countries}`
    );
    // const countries = await getCountries(toCurrency);
    // const exchangeRate = await getExchangeRate(fromCurrency, toCurrency)
    // console.log(countries)
    // console.log(exchangeRate)
}
// convertCurrency('AUD', 'USD', 20).then(result => console.log(result)).catch(error => console.log(error))
console.log(await convertCurrency('AUD', 'USD', 20))

