const mongoose = require('mongoose');

async function connect(params) {
  try {
    const url = process.env.MONGODB_URL;
    console.log(`Connecting to database: ${url}...`);
    mongoose.set('strictQuery', true);
    await mongoose.connect(url);
    console.log('Connect to database successfully!');
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
}

module.exports = { connect };
