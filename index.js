#!/usr/bin/env node

const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .option('year', {
    alias: 'y',
    type: 'boolean',
    description: 'получить текущий год',
  })
  .option('month', {
    alias: 'm',
    type: 'boolean',
    description: 'получить текущуий месяц',
  })
  .option('date', {
    alias: 'd',
    type: 'boolean',
    description: 'получить текущую дату',
  })
  .argv;

const methods = {
  year: ['setFullYear', 'getFullYear'],
  month: ['setMonth', 'getMonth'],
  date: ['setDate', 'getDate']
};

const currentDate = new Date();
const milliseconds = 60000;
const [direction, number] = argv._;

let timeZoneOffset = currentDate.getTimezoneOffset() * milliseconds;
let DateISO = (new Date(Date.now() - timeZoneOffset)).toISOString();
let year = currentDate.getFullYear();
let month = currentDate.getMonth() + 1;
let date = currentDate.getDate();
let dates = {year, month, date};
let dateVal = null;

if (argv.year) {
  dateVal = 'year';
}

if (argv.month) {
  dateVal = 'month';
}

if (argv.date) {
  dateVal = 'date';
}

if (dateVal && !direction) {
  console.log(dates[dateVal]);
}

if (!dateVal) {
  console.log(DateISO);
}

const calculateDate = (direction, dateVal) => {
  if (!direction || !dateVal) {
    return;
  }

  const methodNum = Math.abs(number);
  let currentNum = direction === 'add' ? methodNum : -methodNum;
  const [setDate, getDate] = methods[dateVal];
  currentDate[setDate](currentDate[getDate]() + currentNum);
  let ISODateTime = (new Date(currentDate.getTime() - timeZoneOffset)).toISOString();
  console.log(ISODateTime)
};

calculateDate(direction, dateVal);


