import locationModel from "../models/locationModel";
import locationReviewModel from "../models/locationReviewModel";
import path from "path";
import { resizeImage } from "../services/imageResizer";
import fs from "fs";
const maxDistance = 1000;

export async function aggregateRating(locationId) {
  const a = await locationReviewModel.aggregate([
    { $match: { locationId: locationId } },
    { $group: { _id: locationId, avgRating: { $avg: "$rating" } } },
  ]);
  return a;
}

export async function countRatings(locationId) {
  const a = await locationReviewModel.countDocuments({ locationId });
  return a;
}

export async function createLocation(filepath, locationData) {
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

export async function queryLocation(
  latitude,
  longitude,
  radius = maxDistance,
  latest = true
) {
  return await locationModel
    .find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: radius,
        },
      },
    })
    .sort({ dateCreated: latest ? -1 : 1 });
}

export async function deleteLocation(locationId) {
  await locationReviewModel.deleteMany({ locationId: locationId });
  await locationModel.deleteOne({ _id: locationId });
}

// TODO: change this function, add functionality to change image
export async function updateLocation(
  locationId,
  name = null,
  address = null,
  description = null,
  location = null,
  image = null // image as a filepath
) {
  let obj = {};
  if (name != null) obj.name = name;
  if (address != null) obj.address = address;
  if (description != null) obj.description = description;
  if (location != null) obj.location = location;
  if (image != null) {
    await resizeImage(image, image + ".webp");
    image = fs.readFileSync(image + ".webp");
    obj.image = image;
  }
  await locationModel.updateOne({ _id: locationId }, { ...obj });
}
