const mongoose = require("mongoose");
const premissionSchema = require("./premission");
const credentialSchema = require("./credential");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  imageURI: {
    type: String,
  },
  premissions: {
    type: [premissionSchema],
  },
  credentials: {
    type: [credentialSchema],
  }
});

module.exports = userSchema;
