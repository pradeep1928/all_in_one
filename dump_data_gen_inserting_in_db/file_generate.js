const fs = require('fs');

function generateIndianMobileNumbers() {
  const numbers = [];

  for (let i = 1; i <= 1000000; i++) {
    const mobileNumber = getRandomMobileNumber();
    numbers.push(mobileNumber);
  }

  return numbers;
}

function getRandomMobileNumber() {
  const prefix = '9'; // Assuming all numbers start with '9' in India
  const remainingDigits = getRandomInt(10 ** 9, 10 ** 10 - 1);
  const mobileNumber = prefix + remainingDigits.toString().padStart(9, '0');
  return mobileNumber;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function saveNumbersToFile(numbers) {
  const content = numbers.join('\n');

  fs.writeFile('./upload/mobile_numbers.txt', content, (err) => {
    if (err) {
      console.error('Error saving numbers to file:', err);
    } else {
      console.log('Mobile numbers saved to file successfully!');
    }
  });
}

const indianMobileNumbers = generateIndianMobileNumbers();
saveNumbersToFile(indianMobileNumbers);