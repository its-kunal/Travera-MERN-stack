import express from "express";
import jwt from "jsonwebtoken";
import { generateCode } from "../utils/mail.js";
import {
  createRefreshToken,
  generateToken,
  loginController,
  loginUserEmail,
  signUpController,
  signUpVerifyController,
} from "../controllers/auth.js";
import userModel from "../models/userModel.js";

const router = express.Router();

router.get("/login", async (req, res) => {
  try {
    // destructure query
    const { email, password, username } = req.query;
    // pass it to the login controller
    const token = await loginController(email, password, username);
    // send the token also set the authorisation header
    res.setHeader("Authorization", `Bearer ${token}`);
    return res.status(200).send({ token });
  } catch (err) {
    // if error occurs from any of the controllers return bad response
    console.log(err.message);
    return res.status(400).send(err.message);
  }
});

router.get("/signup", async (req, res) => {
  try {
    const { email, username, password, name } = req.query;
    const token = await signUpController(email, username, name, password);
    res.setHeader("Authorization", `Bearer ${token}`);
    return res.status(200).send({ token });
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.get("/signup/verify", async (req, res) => {
  try {
    const { email, otp } = req.query;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).send("User not found");
    await signUpVerifyController(email, otp, user);
  } catch (err) {
    return res.status(400).send(err.message);
  }
  return res.status(200).send("Verified Successfully");
});

export default router;

// Middleware to authenticate other routes.
export async function verifyMiddleware(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  // const token = req.query.token;
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET_TOKEN,
    function (err, decoded) {
      if (err) {
        return res.status(403).send("Invalid Token");
      }
    }
  );
  req.user = decoded;
  next();
}
