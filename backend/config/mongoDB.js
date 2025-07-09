const mongoose = require("mongoose");

const DB_URL = `${process.env.MONGODB_URI}/google`;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("mongoDB is connected");
  })
  .catch((err) => {
    console.log(`Error while mongoDB connection ${err}`);
  });
