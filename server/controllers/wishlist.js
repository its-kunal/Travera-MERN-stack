import wishlistModel from "../models/wishlistModel";

// get wishlist by user id
async function getWishlist(username) {
  return await wishlistModel.find({ username });
}

// delete a location in wishlist given user id, and location id

export async function deleteLocationInWishlist(username, locationId) {
  await wishlistModel.findOneAndUpdate(
    { username },
    { $pull: { locations: locationId } }
  );
}

// add a location in wishlist given user id and location id

async function addLocationInWishlist(username, locationId) {
  return await wishlistModel.findOneAndUpdate(
    {
      username,
    },
    {
      $addToSet: {
        locations: locationId,
      },
    }
  );
}
