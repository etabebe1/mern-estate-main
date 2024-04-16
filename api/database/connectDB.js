const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("Successfully connected to MongoDB \u{2714}"))
    .catch((error) => {
      // Correctly catch the error object here
      console.error("Failed to connect to MongoDB:", error);
    });
};

module.exports = connectDB;
