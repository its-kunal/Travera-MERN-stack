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

// authentication routes
app.use("/auth", authRouter);
// location routes
app.use("/locations", locationRouter);
// wishlist routes
app.use("/wishlist", wishlistRouter);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
  mongoose.connect(process.env.MONGODB_URI).then((v) => {
    console.log("Connected to DB!");
  });
});
