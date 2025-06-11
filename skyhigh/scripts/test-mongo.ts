// scripts/test-mongo.ts
const mongoose = require("mongoose");
require("dotenv").config();

async function testConnection() {
  try {
    await mongoose.connect(process.env.DATABASE_URL || "");
    console.log("✅ Connected to MongoDB successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1);
  }
}

testConnection();
