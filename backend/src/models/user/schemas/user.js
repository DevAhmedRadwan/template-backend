const mongoose = require("mongoose");
const credentialSchema = require("./credential");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  credentials: {
    type: [credentialSchema],
  }
});

module.exports = userSchema;
