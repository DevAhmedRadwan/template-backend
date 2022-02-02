const mongoose = require("mongoose");
const credentialSchema = require("./credential");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  imageURI: {
    type: String,
    required: false,
    default: "",
  },
  credentials: {
    type: [credentialSchema],
    required: true,
  },
});

module.exports = userSchema;
