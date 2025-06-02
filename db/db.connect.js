const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

const initializeDatabase = async () => {
  try {
    await mongoose
      .connect(mongoUri)
      .then(console.log("Connected to the database."));
  } catch (error) {
    console.log("Error connecting to the database:", error);
  }
};

module.exports = { initializeDatabase };
