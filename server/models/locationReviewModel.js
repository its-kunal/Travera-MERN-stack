import { Schema, model } from "mongoose";
import locationModel from "./locationModel";

export const reviewSchema = new Schema({
  comment: { type: String },
  rating: { type: Number },
  username: { type: String, index: 1 },
  date: { type: Date, default: Date.now },
  locationId: { type: String, index: 1 },
});

export default model("Review", reviewSchema);
