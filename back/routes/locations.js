import express from "express";

const router = express.Router();

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
router.post("/loc", (req,res)=>{})

// create a review for a location
router.post("/:locID/review", (req, res) => {});

// edit a review for a location
router.put("/review/:reviewId", (req,res)=>{})

// delete a review for a location
router.delete("/review/:reviewId", (req,res)=>{})



export default router;