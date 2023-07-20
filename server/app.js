import express from "express";
import cors from "cors";
import mongoose, { connect, model } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import authRouter from "./routes/auth.js";
import wishlistRouter from "./routes/wishlist.js";
import locationRouter from "./routes/locations.js";

const app = express();
const port = process.env.port || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ name: "Welcome to travera!" });
});

app.post("/", (req, res) => {
  let { name } = req.query;
res.send(`Hello, ${name}. Greeting from travera!`);
});

import {
  allLoactions,
  delLoc,
  newLoc,
  searchResults,
  topLocations,
  updateLocation,
} from "./models/locationModel.js";
// authentication routes
app.use("/auth", authRouter);
// location routes
app.use("/locations", locationRouter);
// wishlist routes
app.use("/wishlist", wishlistRouter);

app.get("/loc/top", async (req, res) => {
  const a = await topLocations();
  // console.log(a)
  res.json(a);
});
app.get("/loc", async (req, res) => {
  const a = await allLoactions();
  res.json(a);
});

app.post("/loc/new", async (req, res) => {
  for (let i in req.body) {
    // console.log(JSON.parse(i))
    await newLoc(JSON.parse(i));
  }
  res.send("");
});
app.delete("/loc/:id", async (req, res) => {
  console.log(`got a delete request ${req.params.id}`);
  res.json(await delLoc(req.params.id));
});
app.patch("/loc/:id", async (req, res) => {
  for (let i in req.body) {
    // console.log(JSON.parse(i))
    await updateLocation(JSON.parse(i));
  }
  res.send("");
});
app.post("/loc", async (req, res) => {
  console.log("post request recieved on loc");
  for (let i in req.body) {
    let b = JSON.parse(i).q;
    // console.log(b)
    let a = await searchResults(b);
    console.log(a);
    res.json(a);
  }
});
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
  mongoose.connect(process.env.MONGODB_URI).then((v) => {
    console.log("Connected to DB!");
  });
});
