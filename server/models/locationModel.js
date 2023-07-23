import mongoose, { model, Schema } from "mongoose";

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const locationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxLength: 100,
  },
  dateCreated: { type: Date, required: true, default: Date.now },
  location: {
    type: pointSchema,
    required: true,
    index: "2dsphere",
  },
  image: String,
  createdBy: {
    type: String,
    required: true,
  },
});

export default model("Location", locationSchema);
