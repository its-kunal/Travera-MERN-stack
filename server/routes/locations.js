import express from "express";
import { verifyMiddleware } from "./auth.js";

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
router.use(verifyMiddleware)
// get locations
/*
Params
    Search Query
    Nearby location
    
*/
router.get("/loc", (req, res) => {});

// create a location
/*
params
location model fields
with user details
*/
router.post("/loc", (req, res) => {});

// create a review for a location
router.post("/:locID/review", (req, res) => {});

// edit a review for a location
router.put("/review/:reviewId", (req, res) => {});

// delete a review for a location
router.delete("/review/:reviewId", (req, res) => {});

export default router;
