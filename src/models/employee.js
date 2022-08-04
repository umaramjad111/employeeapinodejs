const mongoose = require("mongoose");
const validator = require("validator");
const employeeschema = new mongoose.Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "this email is already exist"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("this email is not valid");
      }
    },
  },
  number: {
    type: Number,
    required: true,
    min: 11,
  },
  nic: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const employee = new mongoose.model("employee", employeeschema);
module.exports = employee;
