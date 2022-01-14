const mongoose = require("mongoose");

const userSchema = require("./schemas/user");

require("./statics")(userSchema);
require("./methods")(userSchema);

module.exports = mongoose.model("user", userSchema);
