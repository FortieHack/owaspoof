const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TrackingSchema = new Schema(
  {
    email: {
      type: String,
      required: false,
    },
    count: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = Tracking = mongoose.model("Tracking", TrackingSchema);
