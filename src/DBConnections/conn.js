const mongoose = require("mongoose");

const DB =
  "mongodb+srv://umaramjad444:umaramjad444@cluster0.kcq2wei.mongodb.net/employeedb?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected..");
  });
