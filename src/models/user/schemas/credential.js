const mongoose = require("mongoose");
const loginDataSchema = require("./login-data");

const credentialSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      enum: ["local"],
    },
    loginData: {
      type: [loginDataSchema],
    },
  },
  { _id: false }
);

module.exports = credentialSchema;
