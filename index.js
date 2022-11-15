#!/usr/bin/env node

import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

rl.prompt();

let randomNum = Math.floor(Math.random() * 100) + 1;
console.log('Загадано число в диапазоне от 0 до 100');

rl.on('line', line => {
  let numStr = +line.trim();
  if (numStr < randomNum) {
    console.log(chalk.blue('Введенное число меньше загаданного'));
  }

  if (numStr > randomNum) {
    console.log(chalk.blue('Введенное число больше загаданного'));
  }

  if (numStr === randomNum) {
    console.log(chalk.blue(`Число отгадано: ${numStr}`));
    process.exit(0);
  }

  rl.prompt();
}).on('close', () => {
  console.log(chalk.blue('Bye!'));
  process.exit(0);
});








