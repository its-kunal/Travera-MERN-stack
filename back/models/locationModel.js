import { model, Schema } from "mongoose";

const loactionSchema = new Schema({
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
  ratings: {
    type: Number,
    min: 0,
    max: 5,
  },
  date: { type: Date, required: true },
});

export const locationModel = model("Location", loactionSchema);

// function to get all loactions
export const allLoactions = async () => {
  const a = await locationModel
    .find({})
    .sort({ date: "desc" })
    .then((v) => {
      return v;
    });
  return a;
};
// function to update a location
export const updateLocation = async (q) => {
  const { id } = q;
  await locationModel.updateOne({ _id: id }, q);
};

// function to query 16 top locations by ratings.
export const topLocations = async () => {
  const a = await locationModel.find().sort({ ratings: -1 }).limit(4);
  // const a = [
  //     {
  //         name: "fsdfsf",
  //         description: "rews dxvb ",
  //         address:"sdfs",
  //         // ratings: 3,
  //         date: Date.now()
  //     }
  // ]
  return a;
};
// function to query string and find location - loaction, description.
export const searchResults = async (query) => {
  let result = [];
  await locationModel.find({ name: `/${query}/i` }).then((v) => {
    console.log("from find name", v);
    result = [...result, ...v];
  });
  // await locationModel.find({ description: `/${query}/i` }).then(v => {
  //     result = [...result, ...v]
  // })
  return result;
};
// function to create new location.
export const newLoc = async (q) => {
  await locationModel.create(q);
};
// function to delete a location.
export const delLoc = async (id) => {
  console.log(id);
  await locationModel.deleteOne({ _id: id });
};
