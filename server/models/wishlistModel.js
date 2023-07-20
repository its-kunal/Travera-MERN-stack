import { Schema } from "mongoose";

const wishlistSchema = new Schema({
  username: { type: String },
  locations: [{ type: String }],
});
