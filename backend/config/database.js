const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors())

mongoose.set('strictQuery', false)

const connectDatabase = () => {
  mongoose
    .connect('mongodb+srv://Chandu:passwordforapp@cluster0.llnhohr.mongodb.net/Ecommerce?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;
