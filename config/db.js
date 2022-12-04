const mongoose = require("mongoose");

const connectwithDB = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB Connectd"))
    .catch((error) => {
      console.log(`DB Connection Issue`);
      console.log(error);
      process.exit(1);
    });
};

module.exports = connectwithDB;
