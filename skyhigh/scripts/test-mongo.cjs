const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    const uri = process.env.DATABASE_URL;
    if (!uri) throw new Error('Missing DATABASE_URL in .env.local');

    await mongoose.connect(uri);
    console.log('✅ MongoDB connection successful!');
    process.exit(0);
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

testConnection();
