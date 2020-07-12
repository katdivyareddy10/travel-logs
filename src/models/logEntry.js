const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const requiredString = {
  type: String,
  required: true,
};

const requiredNumber = { type: Number, required: true };

const travelLogsSchema = new Schema(
  {
    title: requiredString, // String is shorthand for {type: String}
    description: String,
    comments: String,
    rating: {
      type: Number,
      min: [0, "Too low"],
      max: 10,
      default: 0,
    },
    image: String,
    latitude: {
      ...requiredNumber,
      min: -90,
      max: 90,
    },
    longitude: {
      ...requiredNumber,
      min: -180,
      max: 180,
    },
    visitDate: {
      required: true,
      type: Date,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
const LogEntry = mongoose.model("LogEntry", travelLogsSchema);
module.exports = LogEntry;
