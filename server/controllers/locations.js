import locationModel from "../models/locationModel";
import locationReviewModel from "../models/locationReviewModel";
import path from "path";
import { resizeImage } from "../services/imageResizer";

async function aggregateRating(locationId) {
  const a = await locationReviewModel.aggregate([
    { $match: { locationId: locationId } },
    { $group: { _id: locationId, avgRating: { $avg: "$rating" } } },
  ]);
  return a;
}

function createLocation(filepath, locationData) {
  // resize image
  resizeImage(
    filepath,
    path.relative(
      __dirname,
      path.join(path.dirname(filepath), "resizedImage.webp")
    )
  );
  // convert image to base64
  // add data in database
}
