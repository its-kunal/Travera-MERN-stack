import fs from "fs";

export function imageToBase64(imagePath) {
  return fs.readFileSync(imagePath, "base64");
}

export function base64ToImage(base64Str, filepath) {
  fs.writeFileSync(filepath, base64Str, "base64");
}
