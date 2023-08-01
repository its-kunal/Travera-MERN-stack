import express from "express";
import { verifyMiddleware } from "./auth.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { createLocation } from "../controllers/locations.js";
const upload = multer({
  dest: path.relative(__dirname, path.join(__dirname, "temp")),
});
// Functionalities
/* 
GET - /loc/top
all 16 locations sorted by rating.
GET - /loc
all locations 
POST - /loc/new
create a new location from req.body
DELETE - /loc/:id
Delete that location
POST - /loc?q=query
Returns search result for that query
PATCH - /loc/:id
Updates data
*/

const router = express.Router();
router.use(verifyMiddleware);
// get locations
/*
Params
    Search Query
    Nearby location
    
*/
// router.get("/loc", (req, res) => {});

// // create a location
// /*
// params
// location model fields
// with user details
// */
// router.post("/loc", (req, res) => {});

// // create a review for a location
// router.post("/:locID/review", (req, res) => {});

// // edit a review for a location
// router.put("/review/:reviewId", (req, res) => {});

// // delete a review for a location
// router.delete("/review/:reviewId", (req, res) => {});

// New Outline

// create location
router.post("/", upload.single("image"), async (req, res) => {
  // save file in server temp folder --> use multer
  fs.renameSync(
    path.relative(__dirname, path.join(__dirname, "temp", req.file.filename)),
    req.file.originalname
  );
  // extract location data from request body
  const { name, address, description, dateCreated, location, createdBy } =
    req.body;
  // call create location controller
  try {
    await createLocation(
      path.relative(
        __dirname,
        path.join(__dirname, "temp"),
        req.file.originalname
      ),
      { name, address, description, dateCreated, location, createdBy }
    );
  } catch (err) {
    throw new Error("Unable to create location");
  }
  // return response status with message
  res.status(200).send("Location created");
});

// update location
router.put("/:id", (req, res) => {
  // reterive id from request params
  const { id } = req.params;
});

// get aggregate rating
// get count of number of ratings
// get locations using latitude and longitude

export default router;
