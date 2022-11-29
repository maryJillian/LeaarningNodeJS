const http = require('http');
require('dotenv').config();
const {API_KEY} = process.env;
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const city = argv._.join(' ') || 'New York';
const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`;


http.get(url, (response) => {
  const {statusCode} = response;
  if (statusCode === 404) {
    console.log('User requested a resource which does not exist');
  }

  if (statusCode === 615) {
    console.log('API request has failed');
  }

  if (statusCode === 200) {
    console.log('OK');
  }

  response.setEncoding('utf-8')
  let rowData = '';
  response.on('data', (chunk) => {
    rowData += chunk
  });
  response.on('end', () => {
    console.log(rowData)
  }).on('error', (err) => {
    console.log(err);
  });
});