const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AccountSchema = new Schema(
  {
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = Account = mongoose.model("Account", AccountSchema);
