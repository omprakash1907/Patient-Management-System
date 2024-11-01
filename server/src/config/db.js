const mongoose = require("mongoose");
const Config = require("./index"); // Ensure correct path

const dbConnection = async () => {
  try {
    await mongoose.connect(Config.DB_URL);
    console.log("Database Connected Successfully 🚀");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = dbConnection;
