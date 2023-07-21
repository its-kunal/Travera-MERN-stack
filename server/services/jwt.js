import { sign, verify } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;

export function generateJWT(payload, expiresIn) {
  return sign(payload, JWT_SECRET_TOKEN, {
    expiresIn,
  });
}

export function verifyJWT(token) {
  try {
    return Boolean(verify(token, JWT_SECRET_TOKEN));
  } catch (err) {
    return false;
  }
}
