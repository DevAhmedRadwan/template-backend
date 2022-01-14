const mongoose = require("mongoose");

const loginDataSchema = new mongoose.Schema({
  key: {
    type: String,
  },
  value: {
    type: String,
  },
}, { _id : false });

module.exports = loginDataSchema;
