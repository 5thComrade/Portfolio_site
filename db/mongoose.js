const mongoose = require("mongoose");
const keys = require("../config/keys");

mongoose.connect(keys.mongoose, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
