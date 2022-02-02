const mongoose = require("mongoose");
const { USER } = require("../../constants/models-names");

const userSchema = require("./schemas/user");

require("./statics")(userSchema);
require("./methods")(userSchema);

module.exports = mongoose.model(USER, userSchema);
