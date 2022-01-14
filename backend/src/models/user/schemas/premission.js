const mongoose = require("mongoose");

const premissionSchema = new mongoose.Schema({
  resource: {
    type: String,
  },
  resourceType: {
    type: String,
  },
  action: {
    type: [String],
  },
}, { _id : false });

module.exports = premissionSchema;
