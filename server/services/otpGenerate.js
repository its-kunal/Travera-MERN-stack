import crypto from "crypto";

// function to generate random 6 digit code
export function generateCode() {
  let code = crypto.randomInt(100001, 1000000).toString();
  return code;
}
