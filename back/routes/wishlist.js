import express from "express";
import { verifyMiddleware } from "./auth.js";

const router = express.Router();
router.use(verifyMiddleware)

// get
router.get("/", (req, res) => {});

// add a place
router.get("/", (req, res) => {});

// remove a place
router.get("/", (req, res) => {});

// delete whole wishlist
router.delete("/", (req, res) => {});

export default router;
