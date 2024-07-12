const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(`mongodb://127.0.0.1:27017/myapp`).then((data) => {
    console.log(`MongoDB connected with server :${data.connection.host}`);
  });
};

module.exports = connectDB;
