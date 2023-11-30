const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("Successfully connected to MongoDB \u{2714}"))
    .catch(() => {
      console.log(error);
    });
};

module.exports = connectDB;
