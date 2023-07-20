import locationModel from "../models/locationModel";
import locationReviewModel from "../models/locationReviewModel";

async function aggregateRating(locationId) {
  const a = await locationReviewModel.aggregate([
    { $match: { locationId: locationId } },
    { $group: { _id: locationId, avgRating: { $avg: "$rating" } } },
  ]);
  return a;
}

