import { generateCode } from "../services/otpGenerate.js";
import { sendMail } from "../services/mail.js";
import userModel from "../models/userModel.js";

import bcrypt from "bcrypt";
import { generateJWT } from "../services/jwt.js";

// function to check if user exists : boolean
export async function isUserExist(email) {
  const user = await userModel.findOne({ email });
  if (user) {
    return true;
  }
  return false;
}

export function generateToken(email, username) {
  const payload = { email, username };
  const z = generateJWT(payload, "1h");
  return z;
}

export async function loginController(email, password, username) {
  let user;
  if (username != null || username != undefined) {
    user = await userModel.findOne({ username });
  } else {
    user = await userModel.findOne({ email });
  }
  if (!user) {
    throw new Error("User not found");
  }
  if (!bcrypt.compareSync(password, user.password)) {
    throw new Error("Invalid User Credentials");
  }
  const token = generateToken(user.email, user.username);
  return token;
}

export async function signUpController(email, username, name, password) {
  const otp = generateCode();
  try {
    await userModel.create({ email, username, name, password, otp });
  } catch (err) {
    throw new Error("Please select different username and email");
  }
  try {
    const token = generateToken(email, username);
    try {
      await sendMail({ email, name }, otp);
    } catch (err) {
      throw new Error("Mail not send");
    }
    return token;
  } catch (err) {
    await userModel.findOneAndDelete({ email });
    throw new Error("Token not created");
  }
}

export async function signUpVerifyController(email, otp, user) {
  if (otp === user.otp) {
    await userModel.updateOne(
      { email },
      { isVerified: true, $unset: { otp: 1 } },
    );
  } else {
    throw new Error("Invalid OTP, Try Again");
  }
}

/*
 */

export async function verifyUserOtp(username, otp) {
  let user;
  try {
    user = await userModel.findOne({ username });
  } catch (err) {
    throw new Error("Invalid User Credentials");
  }
  if (user && user.otp === otp) {
    try {
      await userModel.findOne({ username }, function (err, user) {
        user.isVerified = true;
        delete user.otp;
        user.save();
      });
    } catch (err) {
      throw new Error("Please retry after some time");
    }
    return true;
  } else {
    throw new Error("Invalid OTP, Try Again");
  }
}

export async function loginUserEmail(email, pass) {
  const user = await userModel.findOne({ email });
  if (user) {
    if (user.password === pass) {
      return true;
    }
  } else {
    throw new Error("Invalid User Credentials");
  }
  return false;
}

// God knows what to do with this. 😵
// export async function createRefreshToken(email) {
//   const token = generateJWT({ email }, "1h");
//   await refreshTokenModel.create({ email, token });
//   return token;
// }
