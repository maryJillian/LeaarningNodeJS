#!/usr/bin/env node

const readline = require('readline');
const path = require('path');
const fs = require('fs');
const yargs = require('yargs/yargs');

const {hideBin} = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

const fileName = argv._[0] || 'logfile';
const resultGamePath = path.join(`${fileName}.json`);

let beginGame = {
  winner: 0,
  loser: 0
};

fs.writeFile(resultGamePath, JSON.stringify(beginGame), (err) => {
  if (err) throw Error(err)
  console.log('ok');
});

function setResult(result) {
  console.log('You ' + result + '!');

  fs.readFile(resultGamePath, 'utf-8', (err, data) => {
    if (err) throw Error(err);
    let dataFile = JSON.parse(data);
    dataFile[result] += 1;
    fs.writeFile(resultGamePath, JSON.stringify(dataFile), (err) => {
      if (err) throw Error(err);
    });
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

rl.prompt();

console.log('Орел или решка? Орел: 1, Решка: 2');

rl.on('line', line => {
  let random = Math.round(Math.random()) + 1;
  let enteredNumber = +line.trim();

  if (enteredNumber === random) {
    setResult('winner');
  } else {
    setResult('loser');
  }

  console.log('Орел или решка? Орел: 1, Решка: 2');

}).on('close', () => {
  console.log('Bye!');
  process.exit(0);
});







