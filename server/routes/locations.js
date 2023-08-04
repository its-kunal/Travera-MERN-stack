import express from "express";
import { verifyMiddleware } from "./auth.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { createLocation, updateLocation } from "../controllers/locations.js";
const upload = multer({
  dest: "/temp",
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
    // path.relative(__dirname, path.join(__dirname, "temp", req.file.filename)),
    `temp/${req.file.filename}`,
    req.file.originalname
  );
  // extract location data from request body
  const { name, address, description, dateCreated, location, createdBy } =
    req.body;
  // call create location controller
  try {
    await createLocation(`temp/${req.file.filename}`, {
      name,
      address,
      description,
      dateCreated,
      location,
      createdBy,
    });
  } catch (err) {
    throw new Error("Unable to create location");
  }
  // return response status with message
  res.status(200).send("Location created");
});

// update location
router.put("/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  // save file in server temp folder --> use multer
  fs.renameSync(`temp/${req.file.filename}`, req.file.originalname);
  // extract location data from request body
  const { name, address, description, dateCreated, location, createdBy } =
    req.body;
  // call create location controller
  try {
    await updateLocation(
      id,
      name,
      address,
      description,
      location,
      path.relative(
        __dirname,
        path.join(__dirname, "temp"),
        req.file.originalname
      )
    );
  } catch (err) {
    throw new Error("Unable to update location");
  }
  // return response status with message
  res.status(200).send("Location updated");
});

// get aggregate rating
// get count of number of ratings
// get locations using latitude and longitude

export default router;
