import { Schema } from "mongoose";

const wishlistSchema = new Schema({
  username: { type: String, index: true },
  locations: [{ type: String }],
});

const wishlistModel = model("Wishlist", wishlistSchema);

export default wishlistModel;
