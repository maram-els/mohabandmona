const fs = require('fs');
const path = require('path');

// Path to the .ttf file
const fontFilePath = path.join(__dirname, '../assets/fonts/Tajawal-Light.ttf');

// Read the .ttf file and convert it to Base64
fs.readFile(fontFilePath, (err, data) => {
  if (err) {
    console.error('Error reading the font file:', err);
    return;
  }
  const base64Font = data.toString('base64');
  console.log('data:font/truetype;base64,' + base64Font);
});
