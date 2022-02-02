const { ORIGINS_WHITELIST } = require("./env");

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || ORIGINS_WHITELIST.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("cors error: " + origin + " not allowed"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Origin", "Content-Type", "Accept"],
  exposedHeaders: ["Content-Disposition"],
  credentials: true,
};

module.exports = corsOptions;
