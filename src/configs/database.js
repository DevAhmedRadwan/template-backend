const mongoose = require("mongoose");

const { MONGODB_URI } = require("./env");

module.exports = mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
