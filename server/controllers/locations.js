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

async function createLocation(filepath, locationData) {
  // resize image
  try {
    await resizeImage(filepath, "temp/" + path.basename(filepath) + ".webp");
  } catch (error) {
    throw new Error("Cannot Resize Image");
  }
  // convert image to base64
  let base64Str;
  try {
    base64Str = fs.readFileSync("temp/" + path.basename(filepath) + ".webp");
  } catch (error) {
    throw new Error("Cannot Convert Image to Base64");
  }
  // add data in database
  try {
    await locationModel.create({ ...locationData, image: base64Str });
  } catch (err) {
    throw new Error("Cannot Create Location in Database");
  }
}
